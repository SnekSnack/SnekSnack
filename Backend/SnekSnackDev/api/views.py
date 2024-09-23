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

    def get_queryset(self):
        user = self.request.user
        return Personas.objects.all()

class AssignmentCreate(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    # need to login
    permission_classes = [IsAuthenticated]

    # list for students
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

        
    # override the functions to get custom functionality
    def perform_create(self, serializer):
        # checks if all the data is valid
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)
    

class StudentAssignment(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    def get_queryset(self):
        return Assignment.objects.filter(release_date__lt = datetime.datetime.now())

class AssignmentDelete(generics.DestroyAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [StaffOnly]


# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, format=None):
#         data = self.request.data

#         username = data['username']
#         password = data['password']

#         try:
#             user = auth.authenticate(username=username, password=password)

#             if user is not None:
#                 auth.login(request, user)
#                 return Response({ 'success': 'User authenticated' })
#             else:
#                 return Response({ 'error': 'Error Authenticating' })
#         except:
#             return Response({ 'error': 'Something went wrong when logging in' })