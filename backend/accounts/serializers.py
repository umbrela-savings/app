from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from .models import *


User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'first_name', 'last_name')


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


class CircleSerializer(serializers.HyperlinkedModelSerializer):
    users = UserSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Circle
        fields = ('id',
                  'url',
                  'users',
                  'voting_rules',
                  'saving_rules',
                  'start_date',
                  'created_at',
                  'updated_at',
                  'is_active',
                  'join_code')

    def create(self, validated_data):
        creator = validated_data.pop('creator')
        instance = Circle.objects.create(**validated_data)
        CircleUser.objects.create(user=User.objects.get(username=creator),
                                  circle=instance,
                                  is_active=True)
        return instance


class CircleUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CircleUser
        fields = '__all__'


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class CircleUserAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CircleUserAccount
        fields = '__all__'


class CircleAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CircleAccount
        fields = '__all__'


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
