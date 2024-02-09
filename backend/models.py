from django.db import models


class Services(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')
    price = models.DecimalField(default=0, max_digits=10, decimal_places=2)





