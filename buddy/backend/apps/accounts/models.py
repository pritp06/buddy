from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    full_name = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    college = models.CharField(max_length=255, blank=True)
    timezone = models.CharField(max_length=50, blank=True)
    
    ROLE_CHOICES = [
        ('Frontend Engineer', 'Frontend Engineer'),
        ('ML Builder', 'ML Builder'),
        ('Backend Engineer', 'Backend Engineer'),
        ('Product Designer', 'Product Designer'),
        ('Pitch Lead', 'Pitch Lead'),
        ('Full Stack Engineer', 'Full Stack Engineer'),
    ]
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, blank=True)
    
    EXPERIENCE_LEVELS = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
        ('Expert', 'Expert'),
    ]
    experience_level = models.CharField(max_length=50, choices=EXPERIENCE_LEVELS, blank=True)
    
    COLLABORATION_STYLES = [
        ('Async updates', 'Async updates'),
        ('Pairing blocks', 'Pairing blocks'),
        ('Design review loops', 'Design review loops'),
        ('Fast solo execution', 'Fast solo execution'),
    ]
    collaboration_style = models.CharField(max_length=100, choices=COLLABORATION_STYLES, blank=True)
    
    AVAILABILITY_CHOICES = [
        ('Full weekend sprint', 'Full weekend sprint'),
        ('Evenings only', 'Evenings only'),
        ('Final day polish', 'Final day polish'),
        ('Remote async only', 'Remote async only'),
    ]
    availability = models.CharField(max_length=100, choices=AVAILABILITY_CHOICES, blank=True)
    preferred_stack = models.CharField(max_length=255, blank=True)
    preferred_team_size = models.CharField(max_length=100, blank=True)
    hackathon_goals = models.TextField(blank=True)
    discovery_visible = models.BooleanField(default=True)
    proof_visibility = models.CharField(max_length=100, default='Show after request')
    request_policy = models.CharField(max_length=100, default='Verified teams only')
    
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    verified_status = models.BooleanField(default=False)
    profile_completion = models.IntegerField(default=0)
    last_active = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    class Meta:
        indexes = [
            models.Index(fields=['role', 'verified_status']),
            models.Index(fields=['timezone']),
            models.Index(fields=['last_active']),
        ]
