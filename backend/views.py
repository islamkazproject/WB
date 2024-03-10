from rest_framework.permissions import AllowAny

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
)
from rest_framework import viewsets


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = [AllowAny]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [AllowAny]


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = SchedulesSerializer
    permission_classes = [AllowAny]


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]



class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]


