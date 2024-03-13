from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Service,
    Review,
    Schedule,
    UserProfile,
    Appointment,
)
from .serializers import (
    ServicesSerializer,
    ReviewsSerializer,
    SchedulesSerializer,
    UserProfileSerializer,
    AppointmentSerializer,
    AppointmentHistorySerializer
)
from rest_framework import viewsets


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ScheduleView(viewsets.ModelViewSet):
    """
    CRUD schedules for doctor
    """
    queryset = Schedule.objects.all()
    serializer_class = SchedulesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class AppointmentHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AppointmentHistorySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        queryset = Appointment.objects.filter(appointment_status=Appointment.StatusEnum.DONE)
        return queryset

