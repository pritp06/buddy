from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied, ValidationError
from django.db import IntegrityError, transaction
from django.db.models import Count, Prefetch, Q
from django.utils import timezone

from apps.activity.models import Activity
from apps.notifications.models import Notification
from apps.requestsystem.models import TeamRequest
from apps.teams.models import Team, TeamMember, TeamMissingRole, TeamRequiredSkill
from apps.users.models import Skill, UserLinks, UserProject, UserSkill

User = get_user_model()


def split_terms(value):
    return [item.strip() for item in (value or '').replace(';', ',').split(',') if item.strip()]


def get_or_create_skill(name):
    name = name.strip()
    return Skill.objects.get_or_create(normalized_name=name.lower(), defaults={'name': name})[0]


def sync_team_taxonomy(team):
    TeamRequiredSkill.objects.filter(team=team).delete()
    TeamMissingRole.objects.filter(team=team).delete()
    for skill_name in split_terms(team.required_skills):
        TeamRequiredSkill.objects.get_or_create(team=team, skill=get_or_create_skill(skill_name))
    for role in split_terms(team.missing_roles):
        TeamMissingRole.objects.get_or_create(team=team, role=role)


def recompute_profile_completion(user):
    checks = [
        bool(user.full_name),
        bool(user.role),
        bool(user.timezone),
        bool(user.availability),
        bool(user.collaboration_style),
        bool(user.preferred_stack),
        UserSkill.objects.filter(user=user).exists(),
        UserProject.objects.filter(user=user).exists(),
        UserLinks.objects.filter(user=user).filter(Q(github__gt='') | Q(portfolio__gt='') | Q(website__gt='')).exists(),
        bool(user.hackathon_goals or user.bio),
    ]
    user.profile_completion = int((sum(checks) / len(checks)) * 100)
    user.save(update_fields=['profile_completion', 'updated_at'])
    return user.profile_completion


def notify_once(user, category, message, priority='NORMAL', dedupe_key=''):
    if dedupe_key:
        notification, _ = Notification.objects.update_or_create(
            user=user,
            category=category,
            dedupe_key=dedupe_key,
            defaults={'message': message, 'priority': priority, 'is_read': False},
        )
        return notification
    return Notification.objects.create(user=user, category=category, message=message, priority=priority)


def log_activity(user, description, category='GENERAL'):
    return Activity.objects.create(user=user, description=description, category=category)


def create_team(*, leader, name, mission, deadline, missing_roles, required_skills='', **extra):
    if not mission or not deadline or not missing_roles:
        raise ValidationError('Mission, deadline, and missing roles are required.')
    name = name or mission[:80]
    with transaction.atomic():
        team = Team.objects.create(
            name=name,
            mission=mission,
            leader=leader,
            deadline=deadline,
            missing_roles=missing_roles,
            required_skills=required_skills or missing_roles,
            preferred_team_size=extra.get('preferred_team_size', ''),
            proof_requirement=extra.get('proof_requirement', ''),
            collaboration_cadence=extra.get('collaboration_cadence', ''),
            timezone=extra.get('timezone', getattr(leader, 'timezone', '')),
        )
        TeamMember.objects.create(team=team, user=leader, role='Team Lead')
        sync_team_taxonomy(team)
        recompute_team_readiness(team)
        log_activity(leader, f'Created team {team.name} with role gaps: {team.missing_roles}.', 'TEAM')
        return team


def recompute_team_readiness(team):
    member_count = team.members.count()
    open_roles = team.missing_role_links.filter(filled=False).count()
    pending_requests = team.requests.filter(status__in=['PENDING', 'SHORTLISTED']).count()
    proof_bonus = 10 if team.proof_requirement else 0
    base = min(member_count * 22, 55)
    role_coverage = max(0, 30 - (open_roles * 10))
    pipeline = min(pending_requests * 5, 10)
    team.team_readiness = max(0, min(100, base + role_coverage + pipeline + proof_bonus))
    team.recruiting_status = open_roles > 0
    team.save(update_fields=['team_readiness', 'recruiting_status', 'updated_at'])
    return team.team_readiness


def create_join_request(*, sender, team, message, role='', proof_link='', availability='', timezone_value='', commitment=''):
    if sender == team.leader:
        raise ValidationError('Team leaders cannot request to join their own team.')
    if TeamMember.objects.filter(team=team, user=sender).exists():
        raise ValidationError('User is already a member of this team.')
    with transaction.atomic():
        try:
            team_request = TeamRequest.objects.create(
                sender=sender,
                receiver=team.leader,
                team=team,
                request_type='JOIN',
                message=message or '',
                role=role,
                proof_link=proof_link,
                availability=availability,
                timezone=timezone_value,
                commitment=commitment,
                compatibility_score=calculate_request_score(sender, team, role),
            )
        except IntegrityError as exc:
            raise ValidationError('An active request already exists for this user and team.') from exc
        notify_once(
            team.leader,
            'REQUEST',
            f'{sender.get_full_name() or sender.username} requested to join {team.name} as {role or "a teammate"}.',
            priority='HIGH',
            dedupe_key=f'request:{team_request.id}',
        )
        log_activity(sender, f'Sent join request to {team.name}.', 'REQUEST')
        log_activity(team.leader, f'Received join request for {team.name}.', 'REQUEST')
        recompute_team_readiness(team)
        return team_request


def create_invite_request(*, sender, receiver, team, message, role=''):
    if sender != team.leader:
        raise PermissionDenied('Only the team leader can invite builders.')
    if TeamMember.objects.filter(team=team, user=receiver).exists():
        raise ValidationError('User is already on this team.')
    with transaction.atomic():
        try:
            invite = TeamRequest.objects.create(
                sender=sender,
                receiver=receiver,
                team=team,
                request_type='INVITE',
                message=message,
                role=role,
                compatibility_score=calculate_request_score(receiver, team, role),
            )
        except IntegrityError as exc:
            raise ValidationError('An active invite already exists for this builder and team.') from exc
        notify_once(receiver, 'TEAM', f'{team.name} invited you to join as {role or "a teammate"}.', 'HIGH', f'invite:{invite.id}')
        log_activity(sender, f'Invited {receiver.username} to {team.name}.', 'REQUEST')
        return invite


def transition_request(team_request, *, actor, action, role=''):
    allowed = {
        'PENDING': {'shortlist': 'SHORTLISTED', 'reject': 'REJECTED', 'accept': 'ACCEPTED', 'cancel': 'CANCELLED'},
        'SHORTLISTED': {'reject': 'REJECTED', 'accept': 'ACCEPTED', 'cancel': 'CANCELLED'},
        'ACCEPTED': {'create_member': 'TEAM_MEMBER_CREATED'},
    }
    if team_request.receiver != actor and team_request.team.leader != actor:
        raise PermissionDenied('Only the receiving team owner can change this request.')
    if action not in allowed.get(team_request.status, {}):
        raise ValidationError(f'Cannot {action} a request in {team_request.status} state.')
    with transaction.atomic():
        locked = TeamRequest.objects.select_for_update().select_related('team', 'sender', 'receiver').get(pk=team_request.pk)
        next_status = allowed[locked.status][action]
        locked.status = next_status
        locked.save(update_fields=['status', 'updated_at'])
        if action == 'accept':
            transition_request(locked, actor=actor, action='create_member', role=role or locked.role or 'Member')
            return TeamRequest.objects.get(pk=locked.pk)
        if action == 'create_member':
            membership, _ = TeamMember.objects.get_or_create(
                team=locked.team,
                user=locked.sender,
                defaults={'role': role or locked.role or 'Member'},
            )
            locked.team.missing_role_links.filter(role__iexact=membership.role).update(filled=True)
            TeamRequest.objects.filter(team=locked.team, sender=locked.sender).exclude(pk=locked.pk).filter(
                status__in=['PENDING', 'SHORTLISTED', 'ACCEPTED']
            ).update(status='CLOSED', updated_at=timezone.now())
            notify_once(locked.sender, 'TEAM', f'Your request to join {locked.team.name} was accepted.', 'CRITICAL', f'accepted:{locked.pk}')
            log_activity(locked.sender, f'Joined {locked.team.name}.', 'TEAM')
            log_activity(actor, f'Accepted {locked.sender.username} into {locked.team.name}.', 'TEAM')
            recompute_team_readiness(locked.team)
        elif action == 'shortlist':
            notify_once(locked.sender, 'REQUEST', f'{locked.team.name} shortlisted your request.', 'NORMAL', f'shortlist:{locked.pk}')
        elif action == 'reject':
            notify_once(locked.sender, 'REQUEST', f'{locked.team.name} declined your request.', 'NORMAL', f'reject:{locked.pk}')
        return locked


def calculate_request_score(user, team, role=''):
    user_skills = set(user.skills.values_list('skill_name', flat=True))
    team_skills = set(team.required_skill_links.select_related('skill').values_list('skill__name', flat=True)) or set(split_terms(team.required_skills))
    open_roles = set(team.missing_role_links.filter(filled=False).values_list('role', flat=True)) or set(split_terms(team.missing_roles))
    score = 10
    if role and any(role.lower() == open_role.lower() for open_role in open_roles):
        score += 30
    elif user.role and any(user.role.lower() == open_role.lower() for open_role in open_roles):
        score += 25
    if team_skills:
        score += int((len({s.lower() for s in user_skills} & {s.lower() for s in team_skills}) / len(team_skills)) * 35)
    if user.verified_status:
        score += 10
    if user.availability:
        score += 10
    if user.timezone and (team.timezone or team.leader.timezone):
        score += 5
    return min(score, 100)


def optimized_user_discovery_queryset():
    return User.objects.filter(discovery_visible=True).prefetch_related('skills', 'projects').select_related()


def optimized_team_discovery_queryset():
    return Team.objects.select_related('leader').prefetch_related(
        'members',
        'missing_role_links',
        Prefetch('required_skill_links', queryset=TeamRequiredSkill.objects.select_related('skill')),
    ).annotate(active_request_count=Count('requests', filter=Q(requests__status__in=['PENDING', 'SHORTLISTED'])))
