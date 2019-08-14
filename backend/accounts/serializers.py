from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.db import transaction as db_transaction
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
                  'name',
                  'users',
                  'voting_rules',
                  'saving_rules',
                  'start_date',
                  'created_at',
                  'updated_at',
                  'is_active',
                  'join_code')

    @db_transaction.atomic()
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
    circle_user = CircleUserSerializer(many=False, required=False, read_only=True)

    class Meta:
        model = CircleUserAccount
        fields = ('url', 'deposits', 'withdrawals', 'pending_deposits', 'pending_withdrawals',
                 'n_pending', 'circle_user', 'updated_at')


class CircleAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CircleAccount
        fields = '__all__'



class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    # account = CircleUserAccountSerializer(many=False, required=False, read_only=True)
    # circle_account = CircleAccountSerializer(many=False, required=False, read_only=True)

    class Meta:
        model = Transaction
        fields = ('transaction_id', 'circle_account', 'account', 'type', 'amount', 'created_at')

        # @db_transaction.atomic()
        # def save(self, validated_data):
        #     # write transaction as deposit to circle_user
        #     circle_account = CircleAccount.objects.get(pk=validated_data.circle_account)
        #     account = CircleAccount.objects.get(pk=validated_data.account)
        #     validated_data.amount = 30
        #     is_deposit = False
        #     if validated_data.type == "DP":
        #         is_deposit = True
        #
        #     # Update accounts
        #     account.set_pending_funds(delta=validated_data.amount, is_depost=is_deposit)
        #     circle_account.set_pending_funds(delta=validated_data.amount, is_deposit=is_deposit)
        #     transaction = Transaction.objects.create(**validated_data)
        #
        #     return transaction, account, circle_account
