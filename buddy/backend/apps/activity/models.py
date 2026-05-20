from django.db import models
from django.conf import settings

class Activity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activities')
    description = models.TextField()
    category = models.CharField(max_length=50, default='GENERAL')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.description[:30]}"

    class Meta:
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['category']),
        ]
