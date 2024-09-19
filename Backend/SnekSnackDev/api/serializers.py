from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
# from .models import Note
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # pass through the fields and validate data
        model = User
        fields = ["id", "username", "password"]
        # so we dont return the password value
        extra_kwargs = {"password": {"write_only":True}}

    # creating the user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class BotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatBot
        fields = "__all__"
        # so only backend can change

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = "__all__"

