from django.contrib.auth.models import User
from djoser.serializers import UserSerializer
from rest_framework import serializers

from .models import Appointment, Review, Schedule, Service, UserProfile


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class ReviewsSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Review
        fields = "__all__"


class SchedulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"


class SchedulesDoctorSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source="doctor.username", read_only=True)
    time_slot_str = serializers.CharField(
        source="get_time_slot_display", read_only=True
    )

    class Meta:
        model = Schedule
        fields = ("id", "doctor_name", "date", "time_slot_str", "is_available")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    user_details = UserSerializer(source="user", read_only=True)

    class Meta:
        model = UserProfile
        fields = ["id", "user", "user_details", "user_patronymic", "user_birth_date"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class AppointmentHistorySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Appointment
        fields = "__all__"


class AppointmentHistoryDoctorSerializer(serializers.ModelSerializer):
    appointment_schedule = serializers.PrimaryKeyRelatedField(
        queryset=Schedule.objects.all()
    )
    schedule_details = SchedulesSerializer(
        source="appointment_schedule", read_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "appointment_patient",
            "appointment_schedule",
            "schedule_details",
            "appointment_service",
            "appointment_description",
            "appointment_status",
        ]
