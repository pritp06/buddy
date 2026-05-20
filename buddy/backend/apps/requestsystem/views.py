from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.contrib import messages
from .models import TeamRequest
from apps.teams.models import Team
from apps.accounts.models import User
from apps.core.services import create_join_request, create_invite_request, transition_request

@login_required
def send_join_request(request):
    if request.method == 'POST':
        team_id = request.POST.get('team_id')
        team = get_object_or_404(Team, id=team_id) if team_id else Team.objects.filter(recruiting_status=True).exclude(leader=request.user).first()
        if not team:
            messages.error(request, 'No recruiting team is available for this request.')
            return render(request, 'join-team-request.html', status=400)
        try:
            create_join_request(
            sender=request.user,
            team=team,
                message=request.POST.get('impact') or request.POST.get('message') or '',
                role=request.POST.get('role', ''),
                proof_link=request.POST.get('proof', ''),
                availability=request.POST.get('availability', ''),
                timezone_value=request.POST.get('timezone', ''),
                commitment=request.POST.get('commitment', ''),
            )
            return render(request, 'success.html')
        except ValidationError as exc:
            messages.error(request, exc.message)
            return render(request, 'join-team-request.html', status=400)
    return render(request, 'join-team-request.html')

@login_required
def send_invite_request(request):
    if request.method == 'POST':
        team = Team.objects.filter(leader=request.user).first()
        receiver_id = request.POST.get('receiver_id')
        receiver = get_object_or_404(User, id=receiver_id) if receiver_id else User.objects.exclude(id=request.user.id).first()
        if not team or not receiver:
            messages.error(request, 'Create a team and choose a builder before sending an invite.')
            return render(request, 'collaboration-request.html', status=400)
        try:
            create_invite_request(
                sender=request.user,
                receiver=receiver,
                team=team,
                message=request.POST.get('whyFit') or request.POST.get('message') or '',
                role=request.POST.get('teamNeed') or '',
            )
            return render(request, 'success.html')
        except ValidationError as exc:
            messages.error(request, exc.message)
            return render(request, 'collaboration-request.html', status=400)
    return render(request, 'collaboration-request.html')

@login_required
def handle_request(request, request_id, action):
    team_request = get_object_or_404(TeamRequest.objects.select_related('team', 'sender', 'receiver'), id=request_id)
    transition_request(team_request, actor=request.user, action=action, role=request.GET.get('role', 'Member'))
    return redirect('received_requests')

@login_required
def received_requests_view(request):
    reqs = TeamRequest.objects.select_related('sender', 'team').filter(receiver=request.user, status__in=['PENDING', 'SHORTLISTED'])
    return render(request, 'received-requests.html')
