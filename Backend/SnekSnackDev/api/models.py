from django.db import models
from django.contrib.auth.models import User
import django.utils.timezone
# Model designed here
# Create your models here
class Personas(models.Model):
    # basic info
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=100)
    occupation = models.CharField(max_length=100)
    tone = models.CharField(max_length=100)
    
    # Condition
    condition_name = models.CharField(max_length=100)
    condition_description = models.TextField(max_length=300)
    condition_duration = models.CharField(max_length=100)

    # Personality
    personality_overall = models.TextField(max_length=300)
    personality_type = models.CharField(max_length=100)
    outlook = models.CharField(max_length=100)
    decision_style= models.CharField(max_length=100)
    comm_style= models.CharField(max_length=100)

    #  Background
    life_early = models.TextField(max_length=300)
    life_key_events = models.TextField(max_length=300)
    life_current = models.TextField(max_length=300)

    # Relationship and Social
    family = models.TextField(max_length=300)
    friends = models.TextField(max_length=300)
    social_life = models.TextField(max_length=300)

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
    