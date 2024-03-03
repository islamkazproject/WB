from rest_framework import serializers
from .models import Service, Review, Schedule


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
