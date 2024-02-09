from django.shortcuts import render
from .models import Services
from .serializers import ServicesSerializer
from rest_framework import generics


class ServiceCreate(generics.ListCreateAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
