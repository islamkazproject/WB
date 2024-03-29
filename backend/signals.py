from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import UserProfile, Appointment


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


@receiver(post_save, sender=Appointment)
def update_schedule_is_available(sender, instance, created, **kwargs):
    if created:
        schedule = instance.appointment_schedule
        schedule.is_available = False
        schedule.save()
