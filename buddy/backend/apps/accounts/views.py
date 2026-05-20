from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.text import slugify
from .models import User

def signup_view(request):
    if request.method == 'POST':
        email = (request.POST.get('email') or '').strip().lower()
        password = request.POST.get('password') or ''
        if not email or len(password) < 8:
            messages.error(request, "A valid email and password of at least 8 characters are required.")
            return render(request, 'signup.html', status=400)
        base_username = slugify(email.split('@')[0]) or 'builder'
        username = base_username
        suffix = 1
        while User.objects.filter(username=username).exists():
            suffix += 1
            username = f'{base_username}{suffix}'
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return render(request, 'signup.html', status=400)
        else:
            user = User.objects.create_user(username=username, email=email, password=password)
            login(request, user)
            return redirect('onboarding', step='basic')
    return render(request, 'signup.html')

def login_view(request):
    if request.method == 'POST':
        email = (request.POST.get('email') or '').strip().lower()
        password = request.POST.get('password') or ''
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
                messages.error(request, "Invalid credentials.")
        except User.DoesNotExist:
            messages.error(request, "User not found.")
        return render(request, 'login.html', status=400)
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('landing')

@login_required
def delete_account_view(request):
    if request.method == 'POST' and request.POST.get('confirm') == 'CONFIRM':
        request.user.delete()
        return redirect('landing')
    return render(request, 'delete-account.html')

def password_reset_view(request):
    if request.method == 'POST':
        messages.success(request, "If the email exists, a reset link will be sent.")
        return redirect('login')
    return render(request, 'forgot-password.html')
