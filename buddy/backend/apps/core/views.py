from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from apps.users.views import create_project_view, edit_profile_view, upload_resume_view

def landing_view(request):
    if request.user.is_authenticated:
        return render(request, 'dashboard.html')
    return render(request, 'index.html')

@login_required
def onboarding_view(request, step='basic'):
    if request.method == 'POST':
        if step in {'basic', 'skills', 'complete'}:
            return edit_profile_view(request)
        if step == 'proof':
            return create_project_view(request)
        if step == 'resume':
            return upload_resume_view(request)
    template_map = {
        'basic': 'onboarding-basic.html',
        'skills': 'onboarding-skills.html',
        'proof': 'onboarding-proof.html',
        'resume': 'onboarding-resume.html',
        'complete': 'onboarding-complete.html',
    }
    template = template_map.get(step, 'onboarding-basic.html')
    return render(request, template)

def system_page_view(request, page):
    return render(request, f'{page}.html')
