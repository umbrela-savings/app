from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.crypto import get_random_string
from django.db import transaction as db_transaction
from rest_framework import serializers


def get_join_code():
    return get_random_string(8)


class User(AbstractUser):
    class Meta:
        db_table = 'user'


def get_sentinel_user():
    return User.objects.get_or_create(username='deleted')[0]


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    class Meta:
        db_table = 'user_profile'


class Circle(models.Model):
    name = models.CharField(max_length=100)
    executor = models.ForeignKey(User,
                                 null=True,
                                 on_delete=models.SET(get_sentinel_user))
    users = models.ManyToManyField(User,
                                   through='CircleUser',
                                   related_name='circles')
    voting_rules = models.TextField(max_length=100, blank=True)
    saving_rules = models.TextField(max_length=100, blank=True)
    start_date = models.DateField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    join_code = models.TextField(max_length=12,
                                 blank=True,
                                 null=True,
                                 unique=True,
                                 default=get_join_code)

    class Meta:
        db_table = 'circle'

    def __str__(self):
        return self.name


class CircleUser(models.Model):
    """
    CircleUser is a through table that connects Users and Circles and captures
    non-financial data pertinent to the circle-user such as whether they need
    to vote
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='circleuser')
    circle = models.ForeignKey(Circle, on_delete=models.PROTECT, related_name='circleuser')
    date_invited = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_active = models.BooleanField(default=False)
    # is_current = models.BooleanField(default=True)
    # votes_required = models.IntegerField(default=0)

    class Meta:
        db_table = 'circle_user'
        unique_together = ('user', 'circle')


class Message(models.Model):
    circle = models.ForeignKey(Circle, on_delete=models.CASCADE, related_name='message')
    user = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user), related_name='message')
    message = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'message'


#############################
# Accounts and Transactions #
#############################

class AbstractAccount(models.Model):
    deposits = models.IntegerField(default=0)
    withdrawals = models.IntegerField(default=0)
    pending_deposits = models.IntegerField(default=0)
    pending_withdrawals = models.IntegerField(default=0)
    n_pending = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    # TODO: Add logic to ensure pending funds occured before update funds.

    def set_pending_transaction(self, delta, is_deposit):
        assert(delta > 0)

        self.n_pending += 1
        if is_deposit:
            self.pending_deposits += delta
        else:
            self.pending_withdrawals += delta

        return self.save()

    def clear_pending_transaction(self, delta, is_deposit):
        assert(delta > 0)

        self.n_pending -= 1

        if is_deposit:
            self.pending_deposits -= delta
        else:
            self.pending_withdrawals -= delta

        return self.save()

    def accept_pending_transaction(self, delta, is_deposit):
        self.clear_pending_transaction(delta, is_deposit)

        if is_deposit:
            self.deposits += delta
        else:
            self.withdrawals += delta

        return self.save()

    def reject_pending_transaction(self, delta, is_deposit):
        return self.clear_pending_transaction(delta, is_deposit)


class CircleUserAccount(AbstractAccount):
    circle_user = models.OneToOneField(CircleUser, on_delete=models.PROTECT, primary_key=True)

    class Meta:
        db_table = 'circle_user_account'

    @receiver(post_save, sender=CircleUser)
    def create_circleaccount(sender, instance, created, **kwargs):
        if created:
            CircleUserAccount.objects.create(circle_user=instance)


class CircleAccount(AbstractAccount):
    circle = models.OneToOneField(Circle, on_delete=models.PROTECT, primary_key=True)

    class Meta:
        db_table = "circle_account"

    @receiver(post_save, sender=Circle)
    def create_circleaccount(sender, instance, created, **kwargs):
        if created:
            CircleAccount.objects.create(circle=instance)


class Transaction(models.Model):
    WITHDRAWL = "WD"
    DEPOSIT = "DP"
    TYPES = [
        (WITHDRAWL, "withdrawal"),
        (DEPOSIT, "deposit")
    ]

    transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    circle_account = models.ForeignKey(CircleAccount, on_delete=models.PROTECT)
    account = models.ForeignKey(CircleUserAccount, on_delete=models.PROTECT)
    type = models.CharField(max_length=2, choices=TYPES)
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'transaction'

    def is_deposit(self):
        return self.type == "DP"

    def is_withdrawal(self):
        return not self.is_deposit()


    def approve_transaction(self):
        for account in [self.circle_account, self.account]:
            account.accept_pending_transaction(self.amount,
                                               self.is_deposit())

    def reject_transaction(self):
        for account in [self.circle_account, self.account]:
            account.reject_pending_transaction(self.amount,
                                               self.is_deposit())

class TransactionStatus(models.Model):
    STATUSES = [
        ("pending", "pending"),
        ("withdrawn", "withdrawn"),
        ("approved", "approved"),
        ("rejected", "rejected")
        ]

    transaction_id = models.ForeignKey(Transaction, on_delete=models.PROTECT, related_name='status')
    status = models.CharField(max_length=8, choices=STATUSES, default="pending")
    created_at = models.DateTimeField()
