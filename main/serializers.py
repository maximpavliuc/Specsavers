from rest_framework.serializers import ModelSerializer
from .models import DeviceImage, VideoCard, Phone, Laptop, Watch, Slide


class DeviceImageModelSerializer(ModelSerializer):

    class Meta:
        model = DeviceImage
        fields = ['image', 'main']


class VideoCardModelSerializer(ModelSerializer):

    class Meta:
        model = VideoCard
        fields = '__all__'


class PhoneModelSerializer(ModelSerializer):

    images = DeviceImageModelSerializer(many=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['type'] = 'Смартфон'
        representation['cpu'] = instance.cpu.model
        representation['cores'] = instance.cpu.cores
        representation['frequency'] = instance.cpu.frequency
        return representation

    class Meta:
        model = Phone
        fields = '__all__'


class LaptopModelSerializer(ModelSerializer):

    video_card = VideoCardModelSerializer()
    images = DeviceImageModelSerializer(many=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['type'] = 'Ноутбук'
        representation['cpu'] = instance.cpu.model
        representation['cores'] = instance.cpu.cores
        representation['frequency'] = instance.cpu.frequency
        return representation

    class Meta:
        model = Laptop
        fields = '__all__'


class WatchModelSerializer(ModelSerializer):

    images = DeviceImageModelSerializer(many=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['type'] = 'Умные часы'
        return representation

    class Meta:
        model = Watch
        fields = '__all__'


class SlideModelSerializer(ModelSerializer):

    class Meta:
        model = Slide
        fields = '__all__'
