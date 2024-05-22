from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from .models import Phone, Laptop, Watch, Slide
from .serializers import PhoneModelSerializer, LaptopModelSerializer, WatchModelSerializer, SlideModelSerializer


class PhoneModelViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):

    queryset = Phone.objects.all()
    serializer_class = PhoneModelSerializer


class LaptopModelViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):

    queryset = Laptop.objects.all()
    serializer_class = LaptopModelSerializer


class WatchModelViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):

    queryset = Watch.objects.all()
    serializer_class = WatchModelSerializer


class SlideModelViewSet(ListModelMixin, GenericViewSet):

    queryset = Slide.objects.all()
    serializer_class = SlideModelSerializer
