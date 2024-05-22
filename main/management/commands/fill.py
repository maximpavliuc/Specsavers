import json
from django.conf import settings
from django.core.management.base import BaseCommand
from main.models import CPU, VideoCard, Phone, Laptop, Watch, Slide, DeviceImage, Device


def load_from_json(file_name):
    with open(f'{settings.BASE_DIR}/json/{file_name}.json', 'r', encoding='utf-8') as json_file:
        return json.load(json_file)


class Command(BaseCommand):

    def handle(self, *args, **options):
        cpus = load_from_json('cpus')
        video_cards = load_from_json('video_cards')
        phones = load_from_json('phones')
        laptops = load_from_json('laptops')
        watches = load_from_json('watches')
        slides = load_from_json('slides')
        devices_images = load_from_json('devices_images')

        CPU.objects.all().delete()
        for cpu in cpus:
            CPU.objects.create(**cpu)

        VideoCard.objects.all().delete()
        for video_card in video_cards:
            VideoCard.objects.create(**video_card)

        Phone.objects.all().delete()
        for phone in phones:
            cpu = CPU.objects.get(model=phone['cpu'])
            phone['cpu'] = cpu
            Phone.objects.create(**phone)

        Laptop.objects.all().delete()
        for laptop in laptops:
            cpu = CPU.objects.get(model=laptop['cpu'])
            laptop['cpu'] = cpu
            video_card = VideoCard.objects.get(model=laptop['video_card'])
            laptop['video_card'] = video_card
            Laptop.objects.create(**laptop)

        Watch.objects.all().delete()
        for watch in watches:
            Watch.objects.create(**watch)

        Slide.objects.all().delete()
        for slide in slides:
            Slide.objects.create(**slide)

        DeviceImage.objects.all().delete()
        for image in devices_images:
            device = Device.objects.get(model=image['device'])
            image['device'] = device
            DeviceImage.objects.create(**image)

