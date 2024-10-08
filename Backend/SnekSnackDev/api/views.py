from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.response import Response
from .perms import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils import timezone

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()

    # what kind of data we accept
    serializer_class = UserSerializer



class BotCreate(generics.ListCreateAPIView):
    serializer_class = BotSerializer
    # need to login
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # to get access to self
    def get_queryset(self):
        
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
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  # Log validation errors
            return Response(serializer.errors)
        self.perform_create(serializer)
        return Response(serializer.data)

    # override the functions to get custom functionality
    def perform_create(self, serializer):
        # checks if all the data is valid

        if serializer.is_valid():
            # delete conflicting assignments
            # checkAss = Assignment.objects.filter(
            #     release_date__lte=serializer.due_date,
            #     due_date__gte=serializer.release_date
            #     )
            # checkAss.delete()
            serializer.save()
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
        current_date = timezone.now().date()
        current_ass = Assignment.objects.filter(release_date__lte=current_date,due_date__gte=current_date)

        if(current_ass.exists()):
            return None
        else:
            return current_ass.first()

class StudentMessage(generics.ListAPIView):
    serializer_class = MessageSerializer
    authentication_classes = [IsAuthenticated]
    def get_queryset(self, id):
        user = self.request.user
        ass = Assignment.objects.get(id)
        return Message.objects.filter(sent_by = user,assignment=ass)
    
    def perform_create(self,serializer):
        
        # check if input is valid
        if serializer.is_valid():

            # get user in backend so they cant use other people
            user = self.request.user
            messages_sent = Message.objects.filter(sent_by = user, assignment= serializer.assignment).count()
            assignment = Assignment.objects.filter(pk=serializer.assignment)

            # check if assignment exists and if question limit hasnt passed
            if(assignment.exists() and messages_sent<assignment.first().question_limit):
                # save the message
                serializer.sent_by = user
                serializer.save()

                # THIS IS WHERE THE LLM CODE SHOULD GO