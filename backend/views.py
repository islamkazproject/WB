from rest_framework.permissions import IsAdminUser, AllowAny

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
    permission_classes = [IsPatient, IsAdminUser, AllowAny]

    # def get_permissions(self):
    #     if self.action == 'get' or self.action == 'retrieve':
    #         permission_classes = [IsPatient]
    #     else:
    #         permission_classes = [IsRegistrar]
    #     return [permission() for permission in permission_classes]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [IsPatient, IsAdminUser, AllowAny]


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = SchedulesSerializer
    permission_classes = [IsRegistrar, IsAdminUser, IsDoctor, AllowAny]


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

    # def get_permissions(self):
    #     if self.action == 'get' or self.action == 'retrieve' and self.action == 'put' or self.action == 'update':
    #         permission_classes = [IsPatient, IsRegistrar, IsAdminUser]
    #     else:
    #         permission_classes = [IsRegistrar, IsAdminUser, IsDoctor]
    #     return [permission() for permission in permission_classes]
    #
    # def get_queryset(self):
    #     if self.request.user.is_authenticated:
    #         if self.request.user.userprofile.role == 'patient':
    #             return Appointment.objects.filter(patient=self.request.user)
    #         elif self.request.user.userprofile.role == 'doctor':
    #             return Appointment.objects.filter(doctor=self.request.user)
    #         elif self.request.user.userprofile.role == 'registrar':
    #             return Appointment.objects.all()
    #         elif self.request.user.userprofile.role == 'administrator':
    #             return Appointment.objects.all()
    #     return Appointment.objects.none()


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsPatient, IsAdminUser, AllowAny]

    # def get_permissions(self):
    #     if self.action == 'get' or self.action == 'retrieve':
    #         permission_classes = [IsPatient]
    #     else:
    #         permission_classes = [IsRegistrar, IsAdminUser, IsDoctor]
    #     return [permission() for permission in permission_classes]
    #
    # def get_queryset(self):
    #     if self.request.user.is_authenticated:
    #         if self.request.user.userprofile.role == 'patient':
    #             return Appointment.objects.filter(patient=self.request.user)
    #         elif self.request.user.userprofile.role == 'doctor':
    #             return Appointment.objects.filter(doctor=self.request.user)
    #         elif self.request.user.userprofile.role == 'registrar':
    #             return Appointment.objects.all()
    #         elif self.request.user.userprofile.role == 'administrator':
    #             return Appointment.objects.all()
    #     return Appointment.objects.none()
