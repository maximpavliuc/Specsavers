from django.db import models


class CPU(models.Model):
    model = models.CharField(max_length=128, verbose_name='Модель')
    cores = models.SmallIntegerField(verbose_name='Количество ядер')
    frequency = models.IntegerField(verbose_name='Частота процессора (МГц)')


class VideoCard(models.Model):
    model = models.CharField(max_length=128, verbose_name='Модель')
    rank = models.IntegerField(verbose_name='Показатель сравнения')


class Device(models.Model):
    brand = models.CharField(max_length=64, verbose_name='Производитель')
    model = models.CharField(max_length=128, verbose_name='Модель')
    weight = models.IntegerField(verbose_name='Вес (г)')
    diagonal = models.FloatField(verbose_name='Диагональ экрана (дюйм)')
    resolution_width = models.IntegerField(verbose_name='Разрешение экрана - Ширина')
    resolution_height = models.IntegerField(verbose_name='Разрешение экрана - Высота')
    price = models.IntegerField(verbose_name='Стоимость (Лей)')
    link = models.TextField(verbose_name='Ссылка на товар')


class Phone(Device):
    memory = models.IntegerField(verbose_name='Встроенная память (Гб)')
    ram = models.IntegerField(verbose_name='Оперативная память (Гб)')
    cpu = models.ForeignKey(CPU, on_delete=models.CASCADE, verbose_name='Процессор')
    main_camera = models.IntegerField(verbose_name='Основная камера (Мп)')
    front_camera = models.IntegerField(verbose_name='Фронтальная камера (Мп)')
    battery = models.IntegerField(verbose_name='Аккамуляторная батарея (мАч)')


class Laptop(Device):
    memory = models.IntegerField(verbose_name='Встроенная память (Гб)')
    ram = models.IntegerField(verbose_name='Оперативная память (Гб)')
    cpu = models.ForeignKey(CPU, on_delete=models.CASCADE, verbose_name='Процессор')
    video_card = models.ForeignKey(VideoCard, on_delete=models.CASCADE, verbose_name='Видеокарта')


class Watch(Device):
    memory = models.FloatField(null=True, blank=True, verbose_name='Встроенная память (Гб)')
    battery = models.IntegerField(verbose_name='Аккамуляторная батарея (мАч)')


class Slide(models.Model):
    image = models.ImageField(upload_to='slides/', null=True, blank=True, verbose_name='Изображение')
    text = models.TextField(null=True, blank=True, verbose_name='Текст')


class DeviceImage(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name='images', verbose_name='Устройство')
    image = models.ImageField(upload_to='devices/', verbose_name='Изображение')
    main = models.BooleanField(default=False, verbose_name='Основное изображение')


