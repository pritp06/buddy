from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import UserLinks, UserProject, UserResume, UserSkill
from apps.accounts.models import User
from apps.core.services import recompute_profile_completion, split_terms

@login_required
def edit_profile_view(request):
    if request.method == 'POST':
        user = request.user
        user.full_name = request.POST.get('name') or user.full_name
        user.role = request.POST.get('role', user.role)
        user.timezone = request.POST.get('timezone', user.timezone)
        user.availability = request.POST.get('availability', user.availability)
        user.bio = request.POST.get('goals') or user.bio
        user.hackathon_goals = request.POST.get('goals') or user.hackathon_goals
        user.preferred_stack = request.POST.get('stack') or user.preferred_stack
        user.collaboration_style = request.POST.get('style') or user.collaboration_style
        user.preferred_team_size = request.POST.get('teamPref') or user.preferred_team_size
        user.save()
        proof = request.POST.get('proof') or request.POST.get('github')
        if proof:
            links, _ = UserLinks.objects.get_or_create(user=user)
            if proof.startswith('http'):
                links.github = proof
                links.save()
        for skill_name in split_terms(request.POST.get('stack') or request.POST.get('skills')):
            UserSkill.objects.get_or_create(user=user, skill_name=skill_name, defaults={'proficiency': 'Intermediate'})
        recompute_profile_completion(user)
        return redirect('dashboard')
        
    return render(request, 'edit-profile.html')

@login_required
def create_project_view(request):
    if request.method == 'POST':
        UserProject.objects.create(
            user=request.user,
            project_name=request.POST.get('project_name') or request.POST.get('name') or 'Hackathon proof',
            description=request.POST.get('description') or request.POST.get('proofNote') or '',
            role=request.POST.get('projectRole') or request.POST.get('role') or request.user.role,
            tech_stack=request.POST.get('stack') or request.user.preferred_stack,
            github_link=request.POST.get('github') or '',
            live_link=request.POST.get('live_link') or '',
            figma_link=request.POST.get('figma_link') or '',
            contribution_type=request.POST.get('contribution_type') or 'Builder',
            project_status=request.POST.get('project_status') or request.POST.get('recency') or 'Recent',
        )
        recompute_profile_completion(request.user)
        return redirect('dashboard')
    return render(request, 'onboarding-proof.html')

@login_required
def upload_resume_view(request):
    if request.method == 'POST' and request.FILES.get('resume'):
        UserResume.objects.update_or_create(
            user=request.user,
            defaults={'file': request.FILES['resume']}
        )
        recompute_profile_completion(request.user)
        return redirect('onboarding', step='complete')
    return render(request, 'onboarding-resume.html')
