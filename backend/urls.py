

from django.urls import path, include
from backend.views import (
    ServiceViewSet,
    ReviewViewSet,
    ScheduleViewSet,
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'schedules', ScheduleViewSet)


urlpatterns = [
    path('api/v1/', include(router.urls))
]