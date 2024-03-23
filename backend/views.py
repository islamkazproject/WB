from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.viewsets import GenericViewSet

from .models import Appointment, Review, Schedule, Service, UserProfile
from .permissions import IsDoctor, IsRegistrar
from .serializers import (
    AppointmentHistoryDoctorSerializer,
    AppointmentHistorySerializer,
    AppointmentSerializer,
    DoctorSerializer,
    ReviewsSerializer,
    SchedulesDoctorSerializer,
    SchedulesSerializer,
    ServicesSerializer,
    UserProfileSerializer,
)


class ServiceViewSet(viewsets.ModelViewSet):
    """
    CRUD services
    """

    queryset = Service.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ReviewViewSet(viewsets.ModelViewSet):
    """
    CRUD reviews
    """

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


class ScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Получить свободное расписание конкретного врача.
    """

    serializer_class = SchedulesDoctorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        doctor = self.kwargs.get("user_id")
        queryset = Schedule.objects.filter(doctor=doctor, is_available=True)
        return queryset


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    CRUD user profile
    """

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]


class DoctorViewSet(viewsets.ModelViewSet):
    """
    Получить всех пользователей с ролью DOCTOR
    """

    queryset = UserProfile.objects.filter(role=UserProfile.UserRoleChoices.DOCTOR)
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ["user__username", "user__first_name", "user__last_name"]


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    CRUD appointment
    """

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class AppointmentHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Получить всех завершенных заявок
    """

    serializer_class = AppointmentHistorySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        queryset = Appointment.objects.filter(
            appointment_status=Appointment.StatusEnum.DONE
        )
        return queryset


class AppointmentDoctorViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    """
    Получить все записи со статусом ACCEPTED(для врачей)
    """

    serializer_class = AppointmentHistoryDoctorSerializer
    permission_classes = [IsDoctor]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        doctor_id = self.kwargs.get("doctor_id")
        queryset = Appointment.objects.filter(
            appointment_status=Appointment.StatusEnum.ACCEPTED,
            appointment_schedule__doctor__id=doctor_id,
        )
        return queryset


class AppointmentRegistrarViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    """
    Получить все записи со статусом PENDING(для регистраров)
    """

    serializer_class = AppointmentSerializer
    permission_classes = [IsRegistrar]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        return Appointment.objects.filter(
            appointment_status=Appointment.StatusEnum.PENDING
        )
