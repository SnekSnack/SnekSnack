from django.urls import path, include
from .views import *
 
 
urlpatterns = [
    path("persona/list", chatlist, name="textList"),
    path("persona/create", chatlist, name="textList"),
    path("persona/view/<int:id>", chatlist, name="textList"),
    # chat can be created when viewing the persona 
    path("chat/<int:ChatRoomId>", chatlist, name="textList"),
    path("login", chatlist, name="textList"),
    path("logout", chatlist, name="textList"),
    path('hello/', views.hello_world, name='hello_world'),
]
