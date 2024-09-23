from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from rest_framework.response import Response
from .perms import *
from rest_framework_simplejwt.authentication import JWTAuthentication

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()

    # what kind of data we accept
    serializer_class = UserSerializer

    # temporary to let anyone use this view
    

class BotCreate(generics.ListCreateAPIView):
    serializer_class = BotSerializer
    # need to login
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # to get access to self
    def get_queryset(self):
        user = self.request.user
        auth_header = self.request.META.get('HTTP_AUTHORIZATION')
        # only get the notes current user created
        return Personas.objects.all()
    
    # override the functions to get custom functionality
    def perform_create(self, serializer):
        # checks if all the data is valid
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
    
class BotDelete(generics.DestroyAPIView):
    serializer_class = Personas
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [StaffOnly]

class AssignmentCreate(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    # need to login
    authentication_classes = [JWTAuthentication]
    permission_classes = [StaffOnly]

    def get_queryset(self):
        return Assignment.objects.all()
    
        
    # override the functions to get custom functionality
    def perform_create(self, serializer):
        # checks if all the data is valid
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)

class AssignmentDelete(generics.DestroyAPIView):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()
    # need to login
    authentication_classes = [JWTAuthentication]
    permission_classes = [StaffOnly]


class AssignmentEdit(generics.UpdateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    # need to login
    authentication_classes = [JWTAuthentication]
    permission_classes = [StaffOnly]


class StudentAssignment(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Assignment.objects.filter(release_date__lt = datetime.datetime.now())
