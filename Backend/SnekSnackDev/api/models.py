from django.db import models
from django.contrib.auth.models import User
import datetime
# Create your models here.
    
class ChatBot(models.Model):
    name = models.CharField(max_length=100)
    prompt = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Assignment(models.Model):
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField(max_length=1000, blank=True)
    release_date = models.DateField(default= datetime.datetime.now())
    due_date = models.DateField(default= datetime.datetime.now())
    time_limit = models.IntegerField(null=True)
    question_limit = models.IntegerField(null=True)
    # prompt = models.ForeignKey(ChatBot)

    def __str__(self):
        return self.title
    