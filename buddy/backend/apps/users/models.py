from django.db import models
from django.conf import settings

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    normalized_name = models.CharField(max_length=100, unique=True, db_index=True)

    def save(self, *args, **kwargs):
        self.normalized_name = self.name.strip().lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class UserSkill(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skills')
    skill_name = models.CharField(max_length=100)
    skill = models.ForeignKey(Skill, on_delete=models.PROTECT, related_name='user_skills', null=True, blank=True)
    proficiency = models.CharField(max_length=50, choices=[
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ])
    years_experience = models.FloatField(default=0)
    primary_skill = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.skill_name}"

    def save(self, *args, **kwargs):
        self.skill_name = self.skill_name.strip()
        if self.skill_name and not self.skill_id:
            self.skill, _ = Skill.objects.get_or_create(
                normalized_name=self.skill_name.lower(),
                defaults={'name': self.skill_name},
            )
        super().save(*args, **kwargs)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'skill_name'], name='unique_user_skill_name'),
        ]
        indexes = [
            models.Index(fields=['skill_name']),
            models.Index(fields=['user', 'primary_skill']),
        ]

class TechStack(models.Model):
    name = models.CharField(max_length=100, unique=True)
    normalized_name = models.CharField(max_length=100, unique=True, db_index=True)

    def save(self, *args, **kwargs):
        self.normalized_name = self.name.strip().lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class UserProject(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='projects')
    project_name = models.CharField(max_length=255)
    description = models.TextField()
    role = models.CharField(max_length=100)
    tech_stack = models.CharField(max_length=255) # Comma separated or JSON
    tech_stacks = models.ManyToManyField(TechStack, related_name='projects', blank=True)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    figma_link = models.URLField(blank=True)
    contribution_type = models.CharField(max_length=100)
    project_status = models.CharField(max_length=100)
    proof_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.project_name}"

    class Meta:
        indexes = [
            models.Index(fields=['user', 'proof_verified']),
            models.Index(fields=['created_at']),
        ]

class UserLinks(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='links')
    github = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    figma = models.URLField(blank=True)
    leetcode = models.URLField(blank=True)
    website = models.URLField(blank=True)
    twitter = models.URLField(blank=True)

    def __str__(self):
        return f"{self.user.username} Links"

class UserResume(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resume')
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Resume"
