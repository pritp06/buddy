from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from apps.core.services import create_join_request, create_team, recompute_profile_completion
from apps.notifications.models import Notification
from apps.users.models import UserLinks, UserProject, UserSkill

User = get_user_model()


class Command(BaseCommand):
    help = 'Create realistic Hackathon Buddy demo data for local testing and presentations.'

    def handle(self, *args, **options):
        leader = self.user('demo.lead@example.com', 'Demo Lead', 'Backend Engineer', verified=True)
        frontend = self.user('maya.demo@example.com', 'Maya Demo', 'Frontend Engineer', verified=True)
        ml = self.user('arjun.demo@example.com', 'Arjun Demo', 'ML Builder', verified=True)
        designer = self.user('nora.demo@example.com', 'Nora Demo', 'Product Designer', verified=False)

        for user, skills in [
            (leader, ['Django', 'Postgres', 'APIs']),
            (frontend, ['React', 'UI Systems', 'Accessibility']),
            (ml, ['Python', 'RAG', 'Flask']),
            (designer, ['Figma', 'UX Research', 'Pitch']),
        ]:
            for skill in skills:
                UserSkill.objects.get_or_create(user=user, skill_name=skill, defaults={'proficiency': 'Advanced'})
            UserLinks.objects.update_or_create(user=user, defaults={'github': f'https://github.com/{user.username}'})
            UserProject.objects.get_or_create(
                user=user,
                project_name=f'{user.role} proof demo',
                defaults={
                    'description': 'Representative proof item for team formation decisions.',
                    'role': user.role,
                    'tech_stack': ', '.join(skills),
                    'github_link': f'https://github.com/{user.username}/demo',
                    'contribution_type': 'Owner',
                    'project_status': 'Recent',
                    'proof_verified': user.verified_status,
                },
            )
            recompute_profile_completion(user)

        team = create_team(
            leader=leader,
            name='CarbonLoop Demo Team',
            mission='Build a carbon forecast assistant for hackathon judges.',
            deadline='Demo in 48h',
            missing_roles='Frontend Engineer, ML Builder, Product Designer',
            required_skills='React, Python, Figma',
            proof_requirement='Verified project required',
            preferred_team_size='4-5 cross-functional team',
            collaboration_cadence='Fast async updates',
        )

        for candidate in [frontend, ml, designer]:
            try:
                create_join_request(
                    sender=candidate,
                    team=team,
                    message=f'I can own {candidate.role} delivery for the sprint.',
                    role=candidate.role,
                    proof_link=f'https://github.com/{candidate.username}/demo',
                    availability='Full weekend sprint',
                    timezone_value=candidate.timezone,
                    commitment='Own missing role end-to-end',
                )
            except Exception:
                pass

        Notification.objects.get_or_create(
            user=leader,
            category='TEAM',
            dedupe_key='demo:readiness',
            defaults={'message': 'CarbonLoop has urgent role gaps before demo lock.', 'priority': 'CRITICAL'},
        )
        self.stdout.write(self.style.SUCCESS('Demo data created. Login: demo.lead@example.com / DemoPass123'))

    def user(self, email, full_name, role, verified=False):
        username = email.split('@')[0].replace('.', '_')
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': username,
                'full_name': full_name,
                'role': role,
                'timezone': 'UTC+5:30',
                'availability': 'Full weekend sprint',
                'collaboration_style': 'Async updates',
                'preferred_stack': role,
                'hackathon_goals': 'Join a focused team and ship a judge-ready demo.',
                'verified_status': verified,
            },
        )
        if created:
            user.set_password('DemoPass123')
            user.save()
        return user
