# Script seeds dev database

from django_seed import Seed
from django.utils.crypto import get_random_string
from accounts.models import *
import random

seeder = Seed.seeder()


seeder.add_entity(User, 20, {
    'username': lambda x: seeder.faker.user_name(),
    'password': lambda x: get_random_string(),
    'is_superuser': lambda x: 0
})

seeder.add_entity(Circle, 5, {
    'name': lambda x: seeder.faker.bs(),
    'join_code': lambda x: get_join_code()
})

inserted_pks = seeder.execute()

for circle in Circle.objects.all():
    CircleUser.objects.create(circle=circle,
                              user=circle.executor)
    size = random.sample([1, 2, 5], 1)[0]
    for user in random.sample(list(User.objects.all()), size):
        CircleUser.objects.get_or_create(circle=circle, user=user)
