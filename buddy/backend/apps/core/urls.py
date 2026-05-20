from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_view, name='landing'),
    path('onboarding/<str:step>/', views.onboarding_view, name='onboarding'),
    path('page/<str:page>/', views.system_page_view, name='system_page'),
]
