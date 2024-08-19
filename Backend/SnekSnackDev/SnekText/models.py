from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Persona(models.Model):
    name = models.CharField(max_length=255)
    prompt = models.TextField()

class ChatRoom(models.Model):
    name = models.CharField(max_length=255)
    interviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    interviewee = models.ForeignKey(Persona, on_delete=models.CASCADE)

class Text(models.Model):
    content = models.TextField()
    timestamp = models.DateTimeField()

# Messaging features for user AI communication
class Message(models.Model):
    sender = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)  # When the message was sent

    def __str__(self):
        return f'{self.sender}: {self.content[:50]}'
