from django.db import models
from django.conf import settings
from apps.teams.models import Team

class ChatMessage(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username} @ {self.team.name}"
