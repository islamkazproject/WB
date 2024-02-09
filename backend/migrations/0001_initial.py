# Generated by Django 5.0.2 on 2024-02-09 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Services",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("image", models.ImageField(upload_to="services/")),
                (
                    "price",
                    models.DecimalField(decimal_places=2, default=0, max_digits=10),
                ),
            ],
        ),
    ]
