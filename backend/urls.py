from django.urls import path, include, re_path
from backend.views import (
    ServiceViewSet,
    ReviewViewSet,
    ScheduleView,
    UserProfileViewSet,
    AppointmentViewSet,
    AppointmentHistoryViewSet,
    DoctorViewSet,
)
from rest_framework import routers
from react_django.yasg import urlpatterns as doc_url

router = routers.DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'schedules', ScheduleView)
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'doctors', DoctorViewSet, basename='doctor-list')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'^appointments/history/(?P<user_id>\d+)', AppointmentHistoryViewSet, basename='appointment-history')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.authtoken')),
]

urlpatterns += doc_url
