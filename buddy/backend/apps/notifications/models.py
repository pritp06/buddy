from django.db import models
from django.conf import settings

class Notification(models.Model):
    CATEGORIES = [
        ('REQUEST', 'Request Alert'),
        ('TEAM', 'Team Alert'),
        ('CHAT', 'Chat Alert'),
        ('ACTIVITY', 'Activity Alert'),
    ]
    PRIORITIES = [
        ('LOW', 'Low'),
        ('NORMAL', 'Normal'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    category = models.CharField(max_length=20, choices=CATEGORIES)
    priority = models.CharField(max_length=20, choices=PRIORITIES, default='NORMAL')
    message = models.TextField()
    dedupe_key = models.CharField(max_length=160, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.category}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'category', 'dedupe_key'],
                condition=~models.Q(dedupe_key=''),
                name='unique_notification_dedupe',
            ),
        ]
        indexes = [
            models.Index(fields=['user', 'is_read', 'priority']),
            models.Index(fields=['created_at']),
        ]
