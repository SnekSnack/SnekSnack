from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()

    # what kind of data we accept
    serializer_class = UserSerializer

    # temporary to let anyone use this view
    permission_classes = [AllowAny]

# class NoteListCreate(generics.ListCreateAPIView):
#     serializer_class = UserSerializer
#     # need to login
#     permission_classes = [IsAuthenticated]

#     # to get access to self
#     def get_queryset(self):
#         user = self.request.user
#         # only get the notes current user created
#         return Note.objects.filter(author = user)
    
#     # override the functions to get custom functionality
#     def perform_create(self, serializer):
#         # checks if all the data is valid
#         if serializer.is_valid():
#             serializer.save(author = self.request.user)
#         else:
#             print(serializer.errors)
    
# class NoteDelete(generics.DestroyAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)

