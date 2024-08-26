from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
# from .models import Note

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
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatBot
        fields = "__all__"
        # so only backend can change
        # extra_kwargs = {"author": {"read_only":True}}
