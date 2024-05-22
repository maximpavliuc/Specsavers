from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    date_of_birth = models.DateField(null=True, blank=True, verbose_name='Дата рождения')
    phone_number = models.CharField(max_length=32, verbose_name='Номер телефона')
