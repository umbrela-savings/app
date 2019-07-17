from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Circle, CircleUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if not (user and user.is_active):
            raise serializers.ValidationError("We can't find that username and password. You can reset your password or try again.")
        return user


class CircleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circle
        fields = ('id', 'circle_name', 'voting_rules',
                  'saving_rules', 'start_date')


class CircleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CircleUser
        fields = ('id', 'user', 'circle', 'date_invited',
                  'date_joined', 'updated_at', 'status')
