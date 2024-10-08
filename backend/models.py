from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class Service(models.Model):
    service_name = models.CharField(max_length=100, verbose_name="Service Name")
    service_description = models.TextField(verbose_name="Service Description")
    service_image = models.ImageField(upload_to="services", blank=True, verbose_name="Service Image")
    service_price = models.DecimalField(default=0,
                                        max_digits=10,
                                        decimal_places=2,
                                        verbose_name="Service Price")

    def __str__(self):
        return f"{self.service_name}: {self.service_price} рублей"


class UserProfile(models.Model):
    class UserRoleChoices(models.TextChoices):
        PATIENT = "patient"
        REGISTRAR = "registrar"
        DOCTOR = "doctor"
        ADMIN = "admin"

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name="User", related_name="profile"
    )
    user_patronymic = models.CharField(max_length=60, blank=True, null=True, verbose_name="User Patronymic")
    user_birth_date = models.DateField(null=True, blank=True, verbose_name="User Birth Date")
    role = models.CharField(
        max_length=20, choices=UserRoleChoices, default=UserRoleChoices.PATIENT, verbose_name="Role"
    )

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return f"{self.user} {self.role}"


class Review(models.Model):
    class RatingEnum(models.IntegerChoices):
        ONE = 1
        TWO = 2
        THREE = 3
        FOUR = 4
        FIVE = 5

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="User")
    text = models.TextField(verbose_name="Text")
    rating = models.IntegerField(
        choices=RatingEnum.choices,
        default=RatingEnum.FIVE,
        verbose_name="Rating",
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at")

    def __str__(self):
        return f"{self.user} - {str(self.rating)}"


class Schedule(models.Model):
    class TimeSlots(models.IntegerChoices):
        """
        Enum для выбора времени на запись к врачу.
        """

        _9_00 = 900, _("09:00 - 10:00")
        _10_00 = 1000, _("10:00 - 11:00")
        _11_00 = 1100, _("11:00 - 12:00")
        _12_00 = 1200, _("12:00 - 13:00")
        _13_00 = 1300, _("13:00 - 14:00")
        _14_00 = 1400, _("14:00 - 15:00")
        _15_00 = 1500, _("15:00 - 16:00")
        _16_00 = 1600, _("16:00 - 17:00")
        _17_00 = 1700, _("17:00 - 18:00")
        _18_00 = 1800, _("18:00 - 19:00")

    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="doctors", verbose_name="Doctor")
    date = models.DateField(default=timezone.now, verbose_name="Date")
    time_slot = models.IntegerField(choices=TimeSlots.choices, verbose_name="Time Slot")
    is_available = models.BooleanField(default=True, verbose_name="Is Available")

    def __str__(self):
        return f"{self.doctor} - {self.date} - {self.time_slot}"


class Appointment(models.Model):
    class StatusEnum(models.TextChoices):
        PENDING = "P", _("В ОБРАБОТКЕ")
        ACCEPTED = "A", _("ПРИНЯТО")
        CANCELLED = "C", _("ОТМЕНЕНО")
        DONE = "D", _("ВЫПОЛНЕНО")

    appointment_patient = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Patient", related_name="patients"
    )
    appointment_created_timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Created Timestamp")
    appointment_service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name="Service")
    appointment_description = models.TextField(
        max_length=3000, verbose_name="Description", blank=True
    )
    appointment_schedule = models.OneToOneField(
        Schedule,
        on_delete=models.CASCADE,
        verbose_name="Schedule",
        related_name="schedules"
    )
    appointment_status = models.CharField(
        max_length=1,
        verbose_name="Status",
        choices=StatusEnum.choices,
        default=StatusEnum.PENDING,
    )

    def __str__(self):
        return f"{self.appointment_patient} - \
            {self.appointment_service} - \
            {self.appointment_schedule} - \
            {str(self.appointment_status)}"
