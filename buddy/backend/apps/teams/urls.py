from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_team_view, name='create_team'),
    path('dashboard/', views.team_dashboard_view, name='team_dashboard'),
    path('<int:team_id>/leave/', views.leave_team_view, name='leave_team'),
    path('<int:team_id>/members/<int:user_id>/remove/', views.remove_member_view, name='remove_member'),
    path('<int:team_id>/members/<int:user_id>/transfer-leadership/', views.transfer_leadership_view, name='transfer_leadership'),
]
