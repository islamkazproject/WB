from django.urls import include, path, re_path
from rest_framework import routers

from backend.views import (
    AppointmentDoctorViewSet,
    AppointmentHistoryViewSet,
    AppointmentRegistrarViewSet,
    AppointmentViewSet,
    DoctorViewSet,
    ReviewViewSet,
    ScheduleView,
    ScheduleViewSet,
    ServiceViewSet,
    UserProfileViewSet,
)
from react_django.yasg import urlpatterns as doc_url

router = routers.DefaultRouter()
router.register(r"services", ServiceViewSet)
router.register(r"reviews", ReviewViewSet)
router.register(r"schedules", ScheduleView)
router.register(
    r"schedules/doctors/(?P<user_id>\d+)",
    ScheduleViewSet,
    basename="schedule-list"
)
router.register(r"profiles", UserProfileViewSet, basename="profile")
router.register(r"doctors", DoctorViewSet, basename="doctor-list")
router.register(r"appointments", AppointmentViewSet, basename="appointment")
router.register(
    r"^appointments/history/(?P<user_id>\d+)",
    AppointmentHistoryViewSet,
    basename="appointment-history",
)
router.register(
    r"^appointments/doctors/(?P<doctor_id>\d+)",
    AppointmentDoctorViewSet,
    basename="appointment-doctor",
)
router.register(
    r"appointments-registrars",
    AppointmentRegistrarViewSet,
    basename="appointment-registrar",
)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("djoser.urls")),
    re_path("auth/", include("djoser.urls.authtoken")),
]

urlpatterns += doc_url
