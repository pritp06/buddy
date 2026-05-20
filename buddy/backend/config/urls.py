from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.core.urls')),
    path('accounts/', include('apps.accounts.urls')),
    path('users/', include('apps.users.urls')),
    path('teams/', include('apps.teams.urls')),
    path('requests/', include('apps.requestsystem.urls')),
    path('discovery/', include('apps.discovery.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
    path('notifications/', include('apps.notifications.urls')),
    path('activity/', include('apps.activity.urls')),
    path('chat/', include('apps.chat.urls')),
    path('saved/', include('apps.saved.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
