from django.test import TestCase

# Create your tests here.

# Some tests, confirm if written correctly?
import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Personas, Assignment
from datetime import datetime, timedelta

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def make_user(username, password, is_staff=False):
        user = User.objects.create_user(username=username, password=password, is_staff=is_staff)
        return user
    return make_user

@pytest.mark.django_db
class TestCreateUserView:
    def test_create_user(self, api_client):
        url = reverse('create-user')
        data = {'username': 'testuser', 'password': 'testpass123'}
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username='testuser').exists()

@pytest.mark.django_db
class TestBotCreate:
    def test_create_bot_authenticated(self, api_client, create_user):
        user = create_user('testuser', 'testpass123')
        api_client.force_authenticate(user=user)
        url = reverse('bot-create')
        data = {'name': 'TestBot', 'description': 'A test bot'}
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Personas.objects.filter(name='TestBot').exists()

    def test_create_bot_unauthenticated(self, api_client):
        url = reverse('bot-create')
        data = {'name': 'TestBot', 'description': 'A test bot'}
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
class TestBotDelete:
    def test_delete_bot_staff(self, api_client, create_user):
        staff_user = create_user('staffuser', 'staffpass123', is_staff=True)
        api_client.force_authenticate(user=staff_user)
        bot = Personas.objects.create(name='TestBot', description='A test bot')
        url = reverse('bot-delete', kwargs={'pk': bot.pk})
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Personas.objects.filter(pk=bot.pk).exists()

    def test_delete_bot_non_staff(self, api_client, create_user):
        user = create_user('testuser', 'testpass123')
        api_client.force_authenticate(user=user)
        bot = Personas.objects.create(name='TestBot', description='A test bot')
        url = reverse('bot-delete', kwargs={'pk': bot.pk})
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
class TestAssignmentCreate:
    def test_create_assignment_staff(self, api_client, create_user):
        staff_user = create_user('staffuser', 'staffpass123', is_staff=True)
        api_client.force_authenticate(user=staff_user)
        url = reverse('assignment-create')
        data = {'title': 'Test Assignment', 'description': 'A test assignment', 'due_date': '2024-12-31'}
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Assignment.objects.filter(title='Test Assignment').exists()

    def test_create_assignment_non_staff(self, api_client, create_user):
        user = create_user('testuser', 'testpass123')
        api_client.force_authenticate(user=user)
        url = reverse('assignment-create')
        data = {'title': 'Test Assignment', 'description': 'A test assignment', 'due_date': '2024-12-31'}
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
class TestStudentAssignment:
    def test_list_released_assignments(self, api_client, create_user):
        user = create_user('testuser', 'testpass123')
        api_client.force_authenticate(user=user)
        Assignment.objects.create(title='Past Assignment', release_date=datetime.now() - timedelta(days=1))
        Assignment.objects.create(title='Future Assignment', release_date=datetime.now() + timedelta(days=1))
        url = reverse('student-assignments')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['title'] == 'Past Assignment'