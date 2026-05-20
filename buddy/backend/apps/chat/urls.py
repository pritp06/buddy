from django.urls import path
from . import views

urlpatterns = [
    path('', views.team_chat_view, name='team_chat'),
]
