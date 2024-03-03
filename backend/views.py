from .models import Service, Review, Schedule
from .serializers import (
    ServicesSerializer,
    ReviewsSerializer,
    SchedulesSerializer,
)
from rest_framework import viewsets


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServicesSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewsSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = SchedulesSerializer