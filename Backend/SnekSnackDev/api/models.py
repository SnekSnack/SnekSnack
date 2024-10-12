from django.db import models
from django.contrib.auth.models import User
import django.utils.timezone
# Model designed here
# Create your models here
class Personas(models.Model):
    # basic info
    name = models.CharField(max_length=100)
    prompt = models.TextField(max_length=100000)

    def __str__(self):
        return self.name

class Assignment(models.Model):
    name = models.CharField(max_length=200, blank=True)
    description = models.TextField(max_length=1000, blank=True)
    release_date = models.DateField(default= django.utils.timezone.now)
    due_date = models.DateField(default= django.utils.timezone.now)
    question_limit = models.IntegerField(null=True)
    persona = models.ForeignKey(Personas, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Message(models.Model):
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    assignment = models.ForeignKey(Assignment,on_delete=models.CASCADE)