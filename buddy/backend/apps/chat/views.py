from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import ChatMessage
from apps.teams.models import Team

@login_required
def team_chat_view(request):
    # For MVP, just get the first team the user is in
    membership = request.user.team_memberships.first()
    if not membership:
        # Check if leader
        team = request.user.led_teams.first()
    else:
        team = membership.team
        
    if not team:
        return redirect('dashboard')
        
    if request.method == 'POST':
        content = request.POST.get('message')
        if content:
            ChatMessage.objects.create(
                team=team,
                sender=request.user,
                content=content
            )
            
    messages = ChatMessage.objects.filter(team=team).order_by('timestamp')
    
    # Format for HB_DATA if needed, but the current UI uses a hardcoded list in pages.js
    # We should probably pass this data to HB_DATA
    
    return render(request, 'team-chat.html')
