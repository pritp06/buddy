import json
from django.urls import reverse

def hb_data_processor(request):
    """Provides global HB_DATA defaults to all templates."""
    if not request.user.is_authenticated:
        return {}
        
    routes = {
        'landing': reverse('landing'),
        'login': reverse('login'),
        'signup': reverse('signup'),
        'dashboard': reverse('dashboard'),
        'findBuddy': reverse('find_buddy'),
        'findTeam': reverse('find_team'),
        'receivedRequests': reverse('received_requests'),
        'createTeam': reverse('create_team'),
        'joinTeam': reverse('join_team'),
        'collabRequest': reverse('invite_builder'),
        'editProfile': reverse('edit_profile'),
        'notifications': reverse('notifications'),
        'activity': reverse('activity'),
        'savedTeams': reverse('saved_teams'),
        'savedUsers': reverse('saved_users'),
        'forgot': reverse('password_reset'),
        'logout': reverse('logout'),
        # Add more as needed
    }
    
    # We can add more common data here
    return {
        'HB_GLOBAL_ROUTES': json.dumps(routes)
    }
