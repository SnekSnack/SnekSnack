from django.contrib import admin
from django.urls import path, include
from api.views import *
urlpatterns = [
    # personas
    path("bots/", BotCreate.as_view(), name = ""),
    path("bots/edit/<int:pk>/", BotEdit.as_view(), name = "delete"),
    path("bots/delete/<int:pk>/", BotDelete.as_view(), name = "delete-note"),
    # students
    path("students/", StudentAssignment.as_view(), name = "assignmnet-student"),
    
    path("students/Message/<int:pk>/", StudentMessage.as_view(), name = "assignmnet-student"),
    path("students/Message/", StudentMessage.as_view(), name = "assignmnet-student"),
    # admin
    path("assignment/", AssignmentCreate.as_view(), name = "assignmnet"),
    path("assignment/delete/<int:pk>/", AssignmentDelete.as_view(), name = "assignmnet"),
    path("assignment/edit/<int:pk>/", AssignmentEdit.as_view(), name = "assignmnet"),

    path("messages/<int:Assignment>/<int:User>/", MessageFetch.as_view(), name = "assignmnet"),
    path("student/list/", StudentsFetch.as_view(), name = "assignmnet"),

    path("header/", HeaderFetch.as_view(), name = "assignmnet"),
]