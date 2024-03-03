from django.contrib import admin

from backend.models import (
    Appointment,
    Service,
    Schedule,
    Review,
    UserProfile,
)

admin.site.register(Appointment)
admin.site.register(Service)
admin.site.register(Schedule)
admin.site.register(Review)
admin.site.register(UserProfile)

