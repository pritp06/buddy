from django.db import models
from django.conf import settings
from apps.users.models import Skill

class Team(models.Model):
    name = models.CharField(max_length=255)
    mission = models.TextField()
    leader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='led_teams')
    deadline = models.CharField(max_length=100) # e.g., "Demo in 48h"
    required_skills = models.TextField() # Comma separated
    missing_roles = models.TextField() # Comma separated
    team_readiness = models.IntegerField(default=0)
    recruiting_status = models.BooleanField(default=True)
    preferred_team_size = models.CharField(max_length=100, blank=True)
    proof_requirement = models.CharField(max_length=100, blank=True)
    collaboration_cadence = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    timezone = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            models.Index(fields=['leader', 'recruiting_status']),
            models.Index(fields=['created_at']),
            models.Index(fields=['team_readiness']),
        ]

class TeamRequiredSkill(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='required_skill_links')
    skill = models.ForeignKey(Skill, on_delete=models.PROTECT, related_name='required_by_teams')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['team', 'skill'], name='unique_team_required_skill'),
        ]

class TeamMissingRole(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='missing_role_links')
    role = models.CharField(max_length=100)
    urgency = models.CharField(max_length=20, default='HIGH')
    filled = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['team', 'role'], name='unique_team_missing_role'),
        ]
        indexes = [
            models.Index(fields=['role', 'filled']),
        ]

class TeamMember(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='team_memberships')
    role = models.CharField(max_length=100)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} in {self.team.name}"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['team', 'user'], name='unique_team_member'),
        ]
        indexes = [
            models.Index(fields=['team', 'role']),
            models.Index(fields=['user']),
        ]
