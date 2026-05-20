from django.urls import path
from . import views

urlpatterns = [
    path('builders/', views.builder_discovery_view, name='find_buddy'),
    path('teams/', views.team_discovery_view, name='find_team'),
    path('builders/results/', views.builder_discovery_view, name='user_results'),
    path('teams/results/', views.team_discovery_view, name='team_results'),
]
