from django.urls import path, include, re_path
from backend.views import (
    ServiceViewSet,
    ReviewViewSet,
    ScheduleViewSet,
)
from rest_framework import routers
from react_django.yasg import urlpatterns as doc_url

router = routers.DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'schedules', ScheduleViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/', include('djoser.urls')),
    re_path('api/v1/auth/', include('djoser.urls.authtoken')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
]

urlpatterns += doc_url
