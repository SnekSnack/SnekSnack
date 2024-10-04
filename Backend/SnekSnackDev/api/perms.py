from rest_framework.permissions import BasePermission
from django.contrib.auth.models import User

class StaffOnly(BasePermission):
    def has_permission(self, request, view):
        # Allow access if the user is authenticated and is either student, staff, or tutor
        return request.user.groups.filter(name="staff").exists()
