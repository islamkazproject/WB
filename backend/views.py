from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import (
    Service,
    Review,
    Schedule,
    UserProfile,
    Appointment,
)
from .permissions import (
    IsRegistrar,
    IsPatient,
    IsDoctor,
)
from .serializers import (
    ServicesSerializer,
    ReviewsSerializer,
    SchedulesSerializer,
    UserProfileSerializer,
    AppointmentSerializer,
)
from rest_framework import viewsets


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServicesSerializer

    def get_permissions(self):
        if self.action == 'get' or self.action == 'retrieve':
            permission_classes = [IsPatient]
        else:
            permission_classes = [IsRegistrar]
        return [permission() for permission in permission_classes]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [IsPatient, IsAdminUser]


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = SchedulesSerializer
    permission_classes = [IsRegistrar, IsAdminUser, IsDoctor]


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsPatient, IsAdminUser, IsRegistrar, IsDoctor]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsRegistrar, IsPatient, IsAdminUser, IsDoctor]