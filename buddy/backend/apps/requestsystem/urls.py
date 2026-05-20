from django.urls import path
from . import views

urlpatterns = [
    path('join/', views.send_join_request, name='join_team'),
    path('invite/', views.send_invite_request, name='invite_builder'),
    path('received/', views.received_requests_view, name='received_requests'),
    path('handle/<int:request_id>/<str:action>/', views.handle_request, name='handle_request'),
]
