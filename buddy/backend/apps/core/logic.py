def calculate_trust_score(user):
    """
    Calculates an explainable trust score for a user.
    Returns a score (0-100) and a breakdown.
    """
    score = 0
    breakdown = []
    
    # 1. Profile Completion (20%)
    if user.profile_completion >= 80:
        score += 20
        breakdown.append(("Profile", "High completion"))
    elif user.profile_completion >= 50:
        score += 10
        breakdown.append(("Profile", "Medium completion"))
    
    # 2. Verified Status (30%)
    if user.verified_status:
        score += 30
        breakdown.append(("Verification", "Identity/Proof verified"))
    
    # 3. Projects (Proof of Work) (30%)
    project_count = len(getattr(user, '_prefetched_objects_cache', {}).get('projects', [])) if hasattr(user, '_prefetched_objects_cache') and 'projects' in user._prefetched_objects_cache else user.projects.count()
    if project_count >= 3:
        score += 30
        breakdown.append(("Proof", f"{project_count} projects linked"))
    elif project_count > 0:
        score += 15
        breakdown.append(("Proof", f"{project_count} project linked"))
        
    # 4. Links (GitHub/Portfolio) (20%)
    try:
        links = user.links
        link_points = 0
        if links.github: link_points += 10
        if links.portfolio: link_points += 10
        score += link_points
        if link_points > 0:
            breakdown.append(("Links", "External proof linked"))
    except:
        pass
        
    return min(score, 100), breakdown

def calculate_compatibility(user, team):
    """
    Calculates compatibility between a user and a team.
    Returns a score (0-100) and a breakdown.
    """
    score = 0
    breakdown = {
        "stack_match": 0,
        "role_match": 0,
        "timezone_overlap": 0,
        "availability_match": 0,
        "activity_score": 0
    }
    
    # 1. Role Match (25%)
    if user.role in team.missing_roles:
        score += 25
        breakdown["role_match"] = 25
        
    # 2. Skill Overlap (35%)
    user_skills = {skill.skill_name.strip() for skill in user.skills.all()}
    linked_skills = [link.skill.name for link in team.required_skill_links.all()] if hasattr(team, 'required_skill_links') else []
    team_skills = set(linked_skills or [skill.strip() for skill in team.required_skills.split(',') if skill.strip()])
    overlap = user_skills.intersection(team_skills)
    if overlap:
        match_pct = len(overlap) / max(len(team_skills), 1)
        skill_score = int(match_pct * 35)
        score += skill_score
        breakdown["stack_match"] = skill_score
        
    # 3. Timezone & Availability (30%)
    # Simple logic for MVP: if both have values, give some points
    if user.timezone and team.leader.timezone: # Assuming team follows leader's timezone for now
        score += 15
        breakdown["timezone_overlap"] = 15
        
    if user.availability:
        score += 15
        breakdown["availability_match"] = 15
        
    # 4. Activity Score (10%)
    # Based on last_active
    score += 10
    breakdown["activity_score"] = 10
    
    return min(score, 100), breakdown
