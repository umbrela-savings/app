from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# This method of extending User comes from:
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
# Probably not good?
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class Circle(models.Model):
    name = models.CharField(max_length=100)
    users = models.ManyToManyField(User,
                                   through='CircleUser',
                                   related_name='circles')
    voting_rules = models.TextField(max_length=100, blank=True)
    saving_rules = models.TextField(max_length=100, blank=True)
    start_date = models.DateField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'circle'

    def __str__(self):
        return self.name


class CircleUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='circleuser')
    circle = models.ForeignKey(Circle, on_delete=models.CASCADE, related_name='circleuser')
    date_invited = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)
    # is_current = models.BooleanField(default=True)
    # votes_required = models.IntegerField(default=0)

    class Meta:
        db_table = 'circle_user'
        unique_together = ('user', 'circle')
