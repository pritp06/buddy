from apps.core.logic import calculate_trust_score, calculate_compatibility

def serialize_user(user, target_team=None):
    """Serializes a user for the frontend HB_DATA.people array."""
    trust_score, trust_breakdown = calculate_trust_score(user)
    skills = [skill.skill_name for skill in user.skills.all()]
    projects = list(user.projects.all())
    
    # Compatibility if a team is provided
    score = 0
    compatibility = []
    if target_team:
        score, breakdown = calculate_compatibility(user, target_team)
        compatibility = [
            ['Role fit', 'High' if breakdown['role_match'] > 0 else 'Low', 'Fills the open gap' if breakdown['role_match'] > 0 else 'Role mismatch'],
            ['Stack overlap', 'High' if breakdown['stack_match'] > 20 else 'Medium' if breakdown['stack_match'] > 0 else 'Low', f"Score: {breakdown['stack_match']}"],
            ['Availability', 'High' if breakdown['availability_match'] > 0 else 'Low', 'Matches window' if breakdown['availability_match'] > 0 else 'No data'],
            ['Collaboration style', 'Strong', 'Async updates plus pairing']
        ]
    else:
        score = trust_score # Default score is trust if no team context
    
    return {
        'id': user.username,
        'name': user.full_name or user.username,
        'role': user.role,
        'skills': skills,
        'score': score,
        'trustScore': trust_score,
        'verified': user.verified_status,
        'availability': user.availability,
        'availabilityConfidence': 'High' if user.verified_status else 'Medium',
        'timezone': user.timezone,
        'response': 'Usually responds in 2h',
        'active': 'Active recently',
        'proofCount': len(projects),
        'filters': ['verified'] if user.verified_status else [],
        'compatibility': compatibility,
        'projects': [[p.project_name, p.role, p.tech_stack, "Recent"] for p in projects],
        'goals': user.bio
    }

def serialize_team(team, target_user=None):
    """Serializes a team for the frontend HB_DATA.teams array."""
    required_skills = [link.skill.name for link in team.required_skill_links.all()] or [s.strip() for s in team.required_skills.split(',') if s.strip()]
    open_roles = [link.role for link in team.missing_role_links.all() if not link.filled] or [s.strip() for s in team.missing_roles.split(',') if s.strip()]
    score = 80
    if target_user:
        from apps.core.services import calculate_request_score
        score = calculate_request_score(target_user, team, getattr(target_user, 'role', ''))
    return {
        'id': str(team.id),
        'name': team.name,
        'mission': team.mission,
        'skills': required_skills,
        'score': score,
        'verified': True,
        'members': f"{team.members.count()} members",
        'urgency': "Urgent" if team.recruiting_status else "Open",
        'deadline': team.deadline,
        'readiness': team.team_readiness,
        'openRoles': open_roles,
        'filters': ['verified', 'available'],
        'evidence': [
            'Verified team lead',
            f"{', '.join(open_roles)} roles open"
        ],
        'compatibility': [
            ['Missing role fit', 'High', 'Your skills match'],
            ['Stack overlap', 'High', 'Tech stack match']
        ]
    }
