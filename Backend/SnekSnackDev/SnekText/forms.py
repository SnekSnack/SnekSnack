from django import forms
from .models import *

class PersonaForm(forms.ModelForm):
    class Meta:
        model = Persona
        fields = ['name', 'prompt']

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['sender', 'content']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 2}),
        }
