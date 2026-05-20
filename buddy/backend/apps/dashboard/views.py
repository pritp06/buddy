from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Q
from apps.requestsystem.models import TeamRequest
from apps.notifications.models import Notification
from apps.activity.models import Activity
from apps.teams.models import Team, TeamMember
from apps.core.services import recompute_profile_completion, recompute_team_readiness
from apps.core.utils import serialize_team, serialize_user
import json

@login_required
def dashboard_view(request):
    recompute_profile_completion(request.user)
    unread_requests_count = TeamRequest.objects.filter(receiver=request.user, status='PENDING').count()
    shortlisted_count = TeamRequest.objects.filter(receiver=request.user, status='SHORTLISTED').count()
    unread_notifications_count = Notification.objects.filter(user=request.user, is_read=False).count()
    recent_activities = Activity.objects.filter(user=request.user).order_by('-created_at')[:8]
    activity_list = [activity.description for activity in recent_activities]
    primary_team = Team.objects.prefetch_related('members', 'missing_role_links', 'required_skill_links__skill').filter(
        Q(leader=request.user) | Q(members__user=request.user)
    ).distinct().first()
    team_readiness = primary_team.team_readiness if primary_team else 0
    if primary_team:
        recompute_team_readiness(primary_team)
        team_readiness = primary_team.team_readiness
    active_teams = Team.objects.filter(Q(leader=request.user) | Q(members__user=request.user)).distinct()
    urgent_teams = Team.objects.filter(recruiting_status=True).annotate(
        open_roles=Count('missing_role_links', filter=Q(missing_role_links__filled=False))
    ).filter(open_roles__gt=0).order_by('team_readiness')[:3]
    blockers = []
    if not request.user.timezone:
        blockers.append(['Timezone missing', 'Set timezone so teams can judge sprint overlap'])
    if not request.user.projects.exists():
        blockers.append(['Proof missing', 'Add a project so requests have evidence'])
    if not request.user.skills.exists():
        blockers.append(['Skills missing', 'Add stack signals for compatibility ranking'])
    
    context = {
        'hb_data': json.dumps({
            'profileCompletion': {
                'score': request.user.profile_completion,
                'blockers': blockers,
                'next': 'Complete role, proof, availability, and stack signals to improve trust.'
            },
            'requestPipeline': [
                ['Needs decision', unread_requests_count, 'New requests from builders'],
                ['Shortlisted', shortlisted_count, 'Builders you kept warm'],
                ['Accepted', TeamMember.objects.filter(team__leader=request.user).count(), 'Team members']
            ],
            'activity': activity_list or ['Welcome to Hackathon Buddy!', 'Start by completing your profile.'],
            'notificationPriority': list(Notification.objects.filter(user=request.user, is_read=False).order_by('-created_at').values_list('priority', 'message', 'category')[:6]),
            'people': [serialize_user(user) for user in request.user.saved_users.select_related('saved_user').prefetch_related('saved_user__skills', 'saved_user__projects')[:3] for user in [user.saved_user]],
            'teams': [serialize_team(team, request.user) for team in urgent_teams],
            'activeTeams': active_teams.count(),
            'unreadNotifications': unread_notifications_count,
            'teamOperations': {
                'readiness': [
                    ['Role coverage', team_readiness, 'Team is forming'],
                ],
                'missingRoles': [role.role for role in primary_team.missing_role_links.filter(filled=False)] if primary_team else [],
                'nextAction': 'Review pending requests' if unread_requests_count else 'Improve profile proof' if blockers else 'Find teams or invite builders'
            }
        })
    }
    return render(request, 'dashboard.html', context)
