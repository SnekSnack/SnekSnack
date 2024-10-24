from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
# from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # pass through the fields and validate data
        model = User
        fields = ["id", "username", "groups"]
    
class BotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personas
        fields = "__all__"
        # so only backend can change

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ["id","name", "description", "release_date", "due_date","question_limit","persona"]

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["content", "assignment", "byUser"]