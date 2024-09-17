from django.contrib import admin
from django.urls import path, include
from api.views import *
urlpatterns = [
    path("bots/", BotCreate.as_view(), name = "note-list"),
    path("bots/delete/<int:pk>", BotDelete.as_view(), name = "delete-note"),
]