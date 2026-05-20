from django.urls import path
from . import views

urlpatterns = [
    path('', views.notifications_view, name='notifications'),
    path('read-all/', views.mark_all_read_view, name='notifications_read_all'),
]
