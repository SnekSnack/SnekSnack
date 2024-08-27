from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
class ChatBot(models.Model):
    name = models.CharField(max_length=100)
    prompt = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Assignment(models.Model):
    title = models.CharField(max_length=200)
    due_date = models.DateField()
    bots = models.ManyToManyField(ChatBot, related_name='bots')

    def __str__(self):
        return self.title