from django.urls import path
from . import views

app_name = 'minutes'  # Namespace for these URLs

urlpatterns = [
    path('home/', views.home, name='home'),
    path('add/', views.add_meeting, name='add_meeting'),
    path('edit/<int:pk>/', views.edit_meeting, name='edit_meeting'),
    path('view/<int:pk>/', views.view_meeting, name='view_meeting'),
    path('delete/<int:pk>/', views.delete_meeting, name='delete_meeting'),
    path('save/<int:pk>/', views.save_meeting_minutes, name='save_meeting_minutes'),
    path('save_server/<int:pk>/', views.save_meeting_minutes_to_server, name='save_meeting_minutes_server'),
]