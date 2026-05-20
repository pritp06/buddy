from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from .models import Notification

@login_required
def notifications_view(request):
    return render(request, 'notifications.html')

@login_required
def mark_all_read_view(request):
    Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return redirect('notifications')
