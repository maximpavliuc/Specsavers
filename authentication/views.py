from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin
from .models import User
from .serializers import UserSerializer


class UserModelViewSet(GenericViewSet, CreateModelMixin):

    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

