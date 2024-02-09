from django.urls import path
from . import views

urlpatterns = [
    path('api/v1/services/', views.ServiceCreate.as_view()),
]