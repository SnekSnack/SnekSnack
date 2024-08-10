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