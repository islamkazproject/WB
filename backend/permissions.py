from rest_framework import permissions

from backend.models import UserProfile


class IsRegistrar(permissions.BasePermission):
    """
    Разрешает доступ авторизованным пользователям и пользователю с ролью регистратор.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.profile.role == UserProfile.UserRoleChoices.REGISTRAR
        )


class IsDoctor(permissions.BasePermission):
    """
    Разрешает доступ авторизованным пользователям и пользователю с ролью доктор.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.profile.role == UserProfile.UserRoleChoices.DOCTOR
        )


class IsAdminOrIsAuthenticatedReadOnly(permissions.BasePermission):
    """
    Разрешает доступ к безопасным методам (GET, HEAD, OPTIONS) авторизованным пользователям.
    Разрешает все методы (GET, POST, PUT, PATCH, DELETE) только администраторам.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return request.user and request.user.is_staff
