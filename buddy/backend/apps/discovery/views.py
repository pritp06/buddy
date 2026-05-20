from django.shortcuts import render
from django.core.paginator import Paginator
from django.db.models import Q
from apps.accounts.models import User
from apps.teams.models import Team
from apps.core.utils import serialize_user, serialize_team
from apps.core.services import optimized_user_discovery_queryset, optimized_team_discovery_queryset
import json

def builder_discovery_view(request):
    role = request.GET.get('role')
    query = request.GET.get('q', '')
    skill = request.GET.get('skill', '')
    timezone_value = request.GET.get('timezone', '')
    city = request.GET.get('city', '')
    verified = request.GET.get('verified')
    availability = request.GET.get('availability', '')
    
    users = optimized_user_discovery_queryset()
    if request.user.is_authenticated:
        users = users.exclude(id=request.user.id)
    if role:
        users = users.filter(role=role)
    if skill:
        users = users.filter(skills__skill_name__icontains=skill)
    if timezone_value:
        users = users.filter(timezone__icontains=timezone_value)
    if city:
        users = users.filter(city__icontains=city)
    if verified:
        users = users.filter(verified_status=True)
    if availability:
        users = users.filter(availability__icontains=availability)
    if query:
        users = users.filter(Q(full_name__icontains=query) | Q(role__icontains=query) | Q(skills__skill_name__icontains=query) | Q(timezone__icontains=query))
    
    users = users.distinct()
    sort = request.GET.get('sort', 'compatibility')
    if sort == 'newest':
        users = users.order_by('-created_at')
    elif sort == 'active':
        users = users.order_by('-last_active')
    elif sort == 'verified':
        users = users.order_by('-verified_status', '-profile_completion')
    else:
        users = users.order_by('-profile_completion', '-verified_status', '-last_active')
    page = Paginator(users, 12).get_page(request.GET.get('page'))
    
    serialized_users = [serialize_user(u) for u in page.object_list]
    
    context = {
        'hb_data': json.dumps({
            'people': serialized_users,
            'roleNeed': role or 'Frontend Engineer'
        })
    }
    return render(request, 'find-buddy.html', context)

def team_discovery_view(request):
    role = request.GET.get('role')
    query = request.GET.get('q', '')
    teams = optimized_team_discovery_queryset().filter(recruiting_status=True)
    
    if role:
        teams = teams.filter(Q(missing_role_links__role__icontains=role) | Q(missing_roles__icontains=role))
    if query:
        teams = teams.filter(Q(name__icontains=query) | Q(mission__icontains=query) | Q(required_skill_links__skill__name__icontains=query))
    if request.GET.get('verified'):
        teams = teams.filter(leader__verified_status=True)
    sort = request.GET.get('sort', 'compatibility')
    if sort == 'newest':
        teams = teams.order_by('-created_at')
    elif sort == 'urgent':
        teams = teams.order_by('team_readiness', '-active_request_count')
    else:
        teams = teams.order_by('-team_readiness', '-active_request_count')
    page = Paginator(teams.distinct(), 12).get_page(request.GET.get('page'))
        
    serialized_teams = [serialize_team(t, request.user if request.user.is_authenticated else None) for t in page.object_list]
    
    context = {
        'hb_data': json.dumps({
            'teams': serialized_teams,
            'roleNeed': role or 'Frontend Engineer'
        })
    }
    return render(request, 'find-team.html', context)
