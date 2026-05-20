from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.saved_users_view, name='saved_users'),
    path('teams/', views.saved_teams_view, name='saved_teams'),
    path('users/<int:user_id>/save/', views.save_user_view, name='save_user'),
    path('teams/<int:team_id>/save/', views.save_team_view, name='save_team'),
]
