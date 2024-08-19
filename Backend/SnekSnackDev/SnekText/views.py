from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import *
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from .forms import *
from .models import Message

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
    return render(request, "persona_list.html", context)

class persona_create_view(LoginRequiredMixin, CreateView):
    model = Persona
    form_class = PersonaForm
    template_name = 'persona_create.html'
    success_url = reverse_lazy('persona_list')  # Redirect to a list view or another appropriate page after creation

    def form_valid(self, form):
        form.instance.user = self.request.user  # Assign the current user to the profile
        return super().form_valid(form)

def persona_details_view(request, id):
    detail = get_object_or_404(Persona, pk=id)
    context = {"detail": detail}
    return render(request, "persona_detail.html", context)


# View for chatting
def chat_view(request):
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            message = form.save()
            response_message = f'Received message: {message.content[:10]}'
            return redirect('chat')
    else:
        # For inputing data
        form = MessageForm()

    chat_log = Message.objects.all()

    return render(request, 'chat.html', {'form': form, 'chat_log': chat_log})
