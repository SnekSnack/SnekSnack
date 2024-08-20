from django.urls import path, include
from .views import *
from django.urls import path, include
from . import views  # Import views as a module

 
 
urlpatterns = [
    
    path("persona/list", views.persona_list_view, name="persona_list"),
    path("persona/create", views.persona_create_view.as_view(), name="persona_create"),
    path("persona/details/<int:id>", views.persona_details_view, name="persona_details"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path('chat/', views.chat_view, name='chat'),
]

