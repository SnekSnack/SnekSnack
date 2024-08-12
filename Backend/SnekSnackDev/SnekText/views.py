from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import *

# logins
def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("persona_list")
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')
        
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

# personas
def persona_list_view(request):
    personas = Persona.objects.all()
    context = {"personas": personas}
    return render(request, "template/persona_list.html", context)

def persona_create_view(request):
    
    context = {}
    return render(request, "template/persona_create", context)

def persona_details_view(request, id):
    detail = get_object_or_404(Persona, pk=id)
    context = {"detail": detail}
    return render(request, "template/persona_details", context)