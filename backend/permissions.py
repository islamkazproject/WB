from rest_framework import permissions


class IsRegistrar(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.userprofile.role == 'registrar' \
            if hasattr(request.user, 'userprofile') else False

    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and request.user.userprofile.role == 'registrar' \
            if hasattr(request.user, 'userprofile') else False


class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.userprofile.role == 'doctor' \
            if hasattr(request.user, 'userprofile') else False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class IsAdminOrIsAuthenticatedReadOnly(permissions.BasePermission):
    """
    Разрешает доступ к безопасным методам (GET, HEAD, OPTIONS) авторизованным пользователям.
    Разрешает все методы (GET, POST, PUT, PATCH, DELETE) только администраторам.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return request.user and request.user.is_staff
