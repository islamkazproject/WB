from djoser.serializers import UserSerializer, User
from rest_framework import serializers

from .models import Appointment, Review, Schedule, Service, UserProfile


class CustomUserSerializer(UserSerializer):
    id = serializers.IntegerField()
    patronymic = serializers.CharField(source='profile.user_patronymic', allow_null=True)
    birth_date = serializers.DateField(source='profile.user_birth_date', allow_null=True)
    role = serializers.ChoiceField(source='profile.get_role_display', choices=UserProfile.UserRoleChoices)

    class Meta(UserSerializer.Meta):
        fields = ["id", "username", "email", "first_name", "last_name", "patronymic", "birth_date", "role"]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        if profile_data:
            instance.profile.user_patronymic = profile_data.get('user_patronymic', instance.profile.user_patronymic)
            instance.profile.user_birth_date = profile_data.get('user_birth_date', instance.profile.user_birth_date)
            instance.profile.role = profile_data.get('role', instance.profile.role)

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        instance.save()
        return instance


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class SchedulesSerializer(serializers.ModelSerializer):
    time_slot_display = serializers.CharField(source='get_time_slot_display', read_only=True)
    doctor_details = CustomUserSerializer(source='doctor', read_only=True)

    class Meta:
        model = Schedule
        fields = ["id", "doctor", "doctor_details", "date", "time_slot", "time_slot_display", "is_available"]


class SchedulesDoctorSerializer(serializers.ModelSerializer):
    doctor_last_name = serializers.CharField(source="doctor.last_name", read_only=True)
    doctor_first_name = serializers.CharField(source="doctor.first_name", read_only=True)
    doctor_patronymic_name = serializers.CharField(source="doctor.patronymic_name", read_only=True)
    time_slot = serializers.ChoiceField(
        source="get_time_slot_display", choices=Schedule.TimeSlots.choices
    )

    class Meta:
        model = Schedule
        fields = ("id",
                  "doctor_last_name",
                  "doctor_first_name",
                  "doctor_patronymic_name",
                  "date",
                  "time_slot",
                  "is_available")


class UserProfileSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(source="get_role_display", choices=UserProfile.UserRoleChoices)

    class Meta:
        model = UserProfile
        fields = ["id", "user", "user_patronymic", "user_birth_date", "role"]


class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    user_details = UserSerializer(source="user", read_only=True)
    role = serializers.ChoiceField(source="get_role_display", choices=UserProfile.UserRoleChoices)

    class Meta:
        model = UserProfile
        fields = ["id", "user", "user_details", "user_patronymic", "user_birth_date", "role"]


class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = [
            "id",
            "appointment_patient",
            "appointment_schedule",
            "appointment_service",
            "appointment_description",
            "appointment_status",
        ]


class AppointmentHistorySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Appointment
        fields = "__all__"


class AppointmentHistoryDoctorSerializer(serializers.ModelSerializer):
    appointment_patient = CustomUserSerializer(read_only=True)
    appointment_service = ServicesSerializer()
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


class AppointmentRegistrarSerializer(serializers.ModelSerializer):
    appointment_patient = CustomUserSerializer(read_only=True)
    appointment_service = ServicesSerializer()
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


class ReviewsSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    user_name = serializers.CharField(source="user.first_name", read_only=True)

    class Meta:
        model = Review
        fields = ["id", "user", "user_name", "rating", "text"]


