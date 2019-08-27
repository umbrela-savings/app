from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.db import transaction as db_transaction
from .models import *
from django.utils import timezone


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
                  'executor',
                  'voting_rules',
                  'saving_rules',
                  'start_date',
                  'created_at',
                  'updated_at',
                  'is_active',
                  'join_code')

    @db_transaction.atomic()
    def create(self, validated_data):
        executor = validated_data['executor']
        instance = Circle.objects.create(**validated_data)
        CircleUser.objects.create(user=User.objects.get(username=executor),
                                  circle=instance,
                                  is_active=True)
        return instance


class CircleUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = CircleUser
        fields = ('id',
                  'url',
                  'user',
                  'circle',
                  'is_active')


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class CircleUserAccountSerializer(serializers.HyperlinkedModelSerializer):
    circle_user = CircleUserSerializer(many=False, required=False, read_only=True)

    class Meta:
        model = CircleUserAccount
        fields = ('url',
                  'deposits',
                  'withdrawals',
                  'pending_deposits',
                  'pending_withdrawals',
                  'n_pending',
                  'circle_user',
                  'updated_at')



class CircleAccountSerializer(serializers.HyperlinkedModelSerializer):
    circle = CircleSerializer(many=False, required=False, read_only=True)

    class Meta:
        model = CircleAccount
        fields = ('url',
                  'deposits',
                  'withdrawals',
                  'pending_deposits',
                  'pending_withdrawals',
                  'n_pending',
                  'circle',
                  'updated_at')

class TransactionStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransactionStatus
        fields = ('transaction_id',
                  'status',
                  'created_at')
        read_only_fields = ('created_at',)

    @db_transaction.atomic()
    def create(self, validated_data):
        status = validated_data['status']
        transaction = validated_data['transaction_id']
        created_at = timezone.now()

        previous_status = TransactionStatus.objects.filter(transaction_id=transaction).latest('created_at')

        if previous_status.status != 'pending':
            raise serializers.ValidationError('Transaction already completed. Create a new transaction.')

        transaction_status = TransactionStatus.objects.create(
                                         transaction_id=transaction,
                                         status=status,
                                         created_at=created_at)

        if transaction.circle_account.circle.executor != validated_data['authenticated_user']:
            raise serializers.ValidationError('Transaction must be approved or rejected by executor.')

        if status == 'approved':
            transaction.approve_transaction()
        elif status in ['rejected', 'withdrawn']:
            transaction.reject_transaction()

        return transaction_status


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    status = TransactionStatusSerializer(many=True,
                                         required=False,
                                         read_only=True)
    class Meta:
        model = Transaction
        fields = ('transaction_id',
                  'circle_account',
                  'account',
                  'type',
                  'amount',
                  'created_at',
                  'status')

    @db_transaction.atomic()
    def create(self, validated_data):
        transaction = Transaction.objects.create(**validated_data)
        transaction_status = TransactionStatus.objects.create(transaction_id=transaction,
                                         created_at=transaction.created_at)

        circle_account = CircleAccount.objects.get(pk=validated_data['circle_account'])
        account = CircleUserAccount.objects.get(pk=validated_data['account'])

        if circle_account.circle != account.circle_user.circle:
            raise serializers.ValidationError('User not member of circle.')

        for account_ in [account, circle_account]:
            account_.set_pending_transaction(delta=transaction.amount,
                                             is_deposit=transaction.is_deposit())
        return transaction
