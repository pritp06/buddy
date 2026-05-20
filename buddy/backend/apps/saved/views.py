from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from apps.accounts.models import User
from apps.teams.models import Team
from .models import SavedTeam, SavedUser

@login_required
def saved_users_view(request):
    return render(request, 'saved-users.html')

@login_required
def saved_teams_view(request):
    return render(request, 'saved-teams.html')

@login_required
def save_user_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if user != request.user:
        SavedUser.objects.get_or_create(owner=request.user, saved_user=user)
    return redirect('saved_users')

@login_required
def save_team_view(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    SavedTeam.objects.get_or_create(owner=request.user, team=team)
    return redirect('saved_teams')
