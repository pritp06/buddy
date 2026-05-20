from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied, ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import Client, TestCase, override_settings
from django.urls import reverse

from apps.core.services import create_join_request, create_team, transition_request
from apps.notifications.models import Notification
from apps.requestsystem.models import TeamRequest
from apps.saved.models import SavedTeam, SavedUser
from apps.teams.models import TeamMember, TeamMissingRole, TeamRequiredSkill
from apps.users.models import UserProject, UserResume, UserSkill

User = get_user_model()


@override_settings(DEBUG=True, ALLOWED_HOSTS=['testserver'])
class HackathonBuddyWorkflowTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.leader = User.objects.create_user(
            username='leader',
            email='leader@example.com',
            password='StrongPass123',
            full_name='Team Leader',
            role='Backend Engineer',
            timezone='UTC+5:30',
            availability='Full weekend sprint',
            verified_status=True,
        )
        self.builder = User.objects.create_user(
            username='builder',
            email='builder@example.com',
            password='StrongPass123',
            full_name='Builder One',
            role='Frontend Engineer',
            timezone='UTC+5:30',
            availability='Full weekend sprint',
            verified_status=True,
        )
        UserSkill.objects.create(user=self.builder, skill_name='React', proficiency='Advanced')
        self.team = create_team(
            leader=self.leader,
            name='Climate Sprint',
            mission='Climate API demo',
            deadline='Demo in 48h',
            missing_roles='Frontend Engineer, ML Builder',
            required_skills='React, Python',
            proof_requirement='Verified project required',
        )

    def test_signup_login_logout_invalid_login_and_password_reset(self):
        response = self.client.post(reverse('signup'), {'email': 'new@example.com', 'password': 'StrongPass123'})
        self.assertEqual(response.status_code, 302)
        self.assertTrue(User.objects.filter(email='new@example.com').exists())

        self.client.logout()
        response = self.client.post(reverse('login'), {'email': 'new@example.com', 'password': 'StrongPass123'})
        self.assertEqual(response.status_code, 302)
        response = self.client.get(reverse('logout'))
        self.assertEqual(response.status_code, 302)

        response = self.client.post(reverse('login'), {'email': 'new@example.com', 'password': 'wrong'})
        self.assertEqual(response.status_code, 400)
        response = self.client.post(reverse('password_reset'), {'email': 'new@example.com'})
        self.assertEqual(response.status_code, 302)

    def test_protected_routes_redirect_anonymous_users(self):
        for name in ['dashboard', 'create_team', 'join_team', 'received_requests', 'edit_profile']:
            response = self.client.get(reverse(name))
            self.assertEqual(response.status_code, 302, name)
            self.assertIn('/accounts/login/', response['Location'])

    def test_profile_update_skill_project_and_resume_upload(self):
        self.client.force_login(self.builder)
        response = self.client.post(reverse('edit_profile'), {
            'name': 'Builder Updated',
            'role': 'Frontend Engineer',
            'timezone': 'UTC+5:30',
            'availability': 'Full weekend sprint',
            'goals': 'Own demo UI',
            'stack': 'React, Django',
            'github': 'https://github.com/example/proof',
        })
        self.assertEqual(response.status_code, 302)
        self.builder.refresh_from_db()
        self.assertGreaterEqual(self.builder.profile_completion, 50)
        self.assertTrue(UserSkill.objects.filter(user=self.builder, skill_name='React').exists())

        response = self.client.post(reverse('create_project'), {
            'project_name': 'Proof App',
            'description': 'Built a useful demo',
            'role': 'Frontend Engineer',
            'stack': 'React',
            'github': 'https://github.com/example/proof-app',
        })
        self.assertEqual(response.status_code, 302)
        self.assertTrue(UserProject.objects.filter(user=self.builder, project_name='Proof App').exists())

        upload = SimpleUploadedFile('resume.pdf', b'%PDF-1.4 test', content_type='application/pdf')
        response = self.client.post(reverse('upload_resume'), {'resume': upload})
        self.assertEqual(response.status_code, 302)
        self.assertTrue(UserResume.objects.filter(user=self.builder).exists())

    def test_team_creation_normalizes_required_skills_and_missing_roles(self):
        self.client.force_login(self.builder)
        response = self.client.post(reverse('create_team'), {
            'mission': 'AI study helper',
            'deadline': 'Demo tomorrow',
            'roles': 'Backend Engineer, Pitch Lead',
            'skills': 'Django, Python',
            'teamSize': '4-5 cross-functional team',
            'proofReq': 'Recent demo preferred',
            'cadence': 'Fast async updates',
        })
        self.assertEqual(response.status_code, 302)
        team = self.builder.led_teams.get(name='AI study helper')
        self.assertTrue(TeamMember.objects.filter(team=team, user=self.builder, role='Team Lead').exists())
        self.assertEqual(TeamRequiredSkill.objects.filter(team=team).count(), 2)
        self.assertEqual(TeamMissingRole.objects.filter(team=team, filled=False).count(), 2)

    def test_join_request_lifecycle_duplicate_prevention_and_notifications(self):
        request_obj = create_join_request(
            sender=self.builder,
            team=self.team,
            message='I can own the UI.',
            role='Frontend Engineer',
            proof_link='https://github.com/example/ui',
            availability='Full weekend',
            timezone_value='UTC+5:30',
            commitment='Own missing role end-to-end',
        )
        self.assertEqual(request_obj.status, 'PENDING')
        self.assertTrue(Notification.objects.filter(user=self.leader, category='REQUEST').exists())

        with self.assertRaises(ValidationError):
            create_join_request(sender=self.builder, team=self.team, message='Duplicate', role='Frontend Engineer')

        shortlisted = transition_request(request_obj, actor=self.leader, action='shortlist')
        self.assertEqual(shortlisted.status, 'SHORTLISTED')
        accepted = transition_request(shortlisted, actor=self.leader, action='accept', role='Frontend Engineer')
        self.assertEqual(accepted.status, 'TEAM_MEMBER_CREATED')
        self.assertTrue(TeamMember.objects.filter(team=self.team, user=self.builder).exists())
        self.assertTrue(TeamMissingRole.objects.filter(team=self.team, role='Frontend Engineer', filled=True).exists())

        with self.assertRaises(ValidationError):
            transition_request(accepted, actor=self.leader, action='reject')

    def test_unauthorized_request_transition_is_denied(self):
        outsider = User.objects.create_user(username='outsider', email='out@example.com', password='StrongPass123')
        request_obj = create_join_request(sender=self.builder, team=self.team, message='Join', role='Frontend Engineer')
        with self.assertRaises(PermissionDenied):
            transition_request(request_obj, actor=outsider, action='accept')

    def test_discovery_filters_sorting_and_pagination(self):
        response = self.client.get(reverse('find_buddy'), {'role': 'Frontend Engineer', 'skill': 'React', 'verified': '1', 'sort': 'active'})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'HB_DATA')

        response = self.client.get(reverse('find_team'), {'role': 'Frontend Engineer', 'q': 'Climate', 'sort': 'urgent'})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'HB_DATA')

    def test_dashboard_uses_real_operational_data(self):
        create_join_request(sender=self.builder, team=self.team, message='Ready', role='Frontend Engineer')
        self.client.force_login(self.leader)
        response = self.client.get(reverse('dashboard'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'HB_DATA')
        self.assertContains(response, 'Needs decision')

    def test_saved_items_and_notification_read_tracking(self):
        self.client.force_login(self.builder)
        response = self.client.get(reverse('save_team', args=[self.team.id]))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(SavedTeam.objects.filter(owner=self.builder, team=self.team).exists())

        response = self.client.get(reverse('save_user', args=[self.leader.id]))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(SavedUser.objects.filter(owner=self.builder, saved_user=self.leader).exists())

        Notification.objects.create(user=self.builder, category='TEAM', priority='HIGH', message='Test')
        response = self.client.get(reverse('notifications_read_all'))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Notification.objects.filter(user=self.builder, is_read=False).exists())

    def test_csrf_protection_blocks_unsafe_post_without_token(self):
        csrf_client = Client(enforce_csrf_checks=True)
        csrf_client.force_login(self.builder)
        response = csrf_client.post(reverse('create_team'), {
            'mission': 'Blocked',
            'deadline': 'Soon',
            'roles': 'Designer',
        })
        self.assertEqual(response.status_code, 403)
