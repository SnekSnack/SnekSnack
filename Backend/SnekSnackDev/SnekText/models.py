from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#! Can be revised so that it combines with the user
class Persona(models.Model):
    name = models.CharField(max_length=255)
    prompt = models.TextField()


# Messaging features for user AI communication
class Message(models.Model):
    sender = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)  # When the message was sent

    def __str__(self):
        return f'{self.sender}: {self.content[:50]}'
    


#TODO: Assignment  
