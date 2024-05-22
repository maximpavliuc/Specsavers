from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        print(validated_data)

        user = UserModel.objects.create_user(
            **validated_data
        )

        return user

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'email')