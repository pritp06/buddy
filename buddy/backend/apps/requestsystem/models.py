from django.db import models
from django.conf import settings
from apps.teams.models import Team

class TeamRequest(models.Model):
    REQUEST_TYPES = [
        ('JOIN', 'User wants to join team'),
        ('INVITE', 'Team invites user'),
    ]
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
        ('CANCELLED', 'Cancelled'),
        ('SHORTLISTED', 'Shortlisted'),
        ('TEAM_MEMBER_CREATED', 'Team member created'),
        ('CLOSED', 'Closed'),
    ]
    
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_requests')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_requests', null=True, blank=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='requests')
    request_type = models.CharField(max_length=10, choices=REQUEST_TYPES)
    message = models.TextField()
    compatibility_score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    role = models.CharField(max_length=100, blank=True)
    proof_link = models.URLField(blank=True)
    availability = models.CharField(max_length=100, blank=True)
    timezone = models.CharField(max_length=100, blank=True)
    commitment = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.sender.username} -> {self.team.name} ({self.status})"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['sender', 'team', 'request_type'],
                condition=models.Q(status__in=['PENDING', 'SHORTLISTED', 'ACCEPTED']),
                name='unique_active_team_request',
            ),
        ]
        indexes = [
            models.Index(fields=['receiver', 'status']),
            models.Index(fields=['sender', 'status']),
            models.Index(fields=['team', 'status']),
            models.Index(fields=['created_at']),
        ]
