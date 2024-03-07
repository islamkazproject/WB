from rest_framework import serializers
from .models import Service, Review, Schedule, UserProfile, Appointment


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'service_name', 'service_description', 'service_image', 'service_price')


class ReviewsSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Review
        fields = "__all__"


class SchedulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"
