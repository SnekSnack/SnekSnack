from django.contrib import admin
from django.urls import path, include
from api.views import *
urlpatterns = [
    path("bots/", BotCreate.as_view(), name = ""),
    path("bots/delete/<int:pk>", BotDelete.as_view(), name = "delete-note"),
    # path("user/", userCreate.as_view(), name = ""),
    path("login/", LoginView.as_view(), name = "delete-note"),

]