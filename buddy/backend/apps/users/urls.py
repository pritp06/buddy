from django.urls import path
from . import views

urlpatterns = [
    path('edit/', views.edit_profile_view, name='edit_profile'),
    path('projects/create/', views.create_project_view, name='create_project'),
    path('resume/upload/', views.upload_resume_view, name='upload_resume'),
]
