from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied, ValidationError
from django.contrib import messages
from .models import Team, TeamMember
from apps.core.services import create_team, recompute_team_readiness

@login_required
def create_team_view(request):
    if request.method == 'POST':
        try:
            create_team(
                leader=request.user,
                name=request.POST.get('name') or request.POST.get('mission'),
                mission=request.POST.get('mission'),
                deadline=request.POST.get('deadline'),
                missing_roles=request.POST.get('roles'),
                required_skills=request.POST.get('skills') or request.POST.get('roles'),
                preferred_team_size=request.POST.get('teamSize', ''),
                proof_requirement=request.POST.get('proofReq', ''),
                collaboration_cadence=request.POST.get('cadence', ''),
            )
            return redirect('team_dashboard')
        except ValidationError as exc:
            messages.error(request, exc.message)
            return render(request, 'create-team.html', status=400)
        
    return render(request, 'create-team.html')

@login_required
def team_dashboard_view(request):
    # Get the team the user leads or is a member of
    team = Team.objects.filter(leader=request.user).first()
    if not team:
        membership = TeamMember.objects.filter(user=request.user).first()
        team = membership.team if membership else None
        
    if not team:
        return redirect('create_team')
        
    recompute_team_readiness(team)
    return render(request, 'team-dashboard.html')

@login_required
def leave_team_view(request, team_id):
    team = Team.objects.get(id=team_id)
    if team.leader == request.user:
        raise PermissionDenied('Transfer leadership before leaving the team.')
    TeamMember.objects.filter(team=team, user=request.user).delete()
    recompute_team_readiness(team)
    return redirect('dashboard')

@login_required
def remove_member_view(request, team_id, user_id):
    team = Team.objects.get(id=team_id, leader=request.user)
    TeamMember.objects.filter(team=team, user_id=user_id).delete()
    recompute_team_readiness(team)
    return redirect('team_dashboard')

@login_required
def transfer_leadership_view(request, team_id, user_id):
    team = Team.objects.get(id=team_id, leader=request.user)
    member = TeamMember.objects.get(team=team, user_id=user_id)
    team.leader = member.user
    team.save(update_fields=['leader', 'updated_at'])
    return redirect('team_dashboard')
