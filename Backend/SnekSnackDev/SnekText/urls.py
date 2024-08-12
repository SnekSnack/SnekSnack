from django.urls import path, include
from .views import *
 
 
urlpatterns = [
    path("persona/list", persona_list_view, name="persona_list"),
    path("persona/create", persona_create_view, name="persona_create"),
    path("persona/details/<int:id>", persona_details_view, name="persona_details"),
    # chat can be created when viewing the persona 
    # path("chat/<int:ChatRoomId>", chatroom_view, name="textList"),
    path("login", login_view, name="login"),
    path("logout", logout_view, name="logout"),
]