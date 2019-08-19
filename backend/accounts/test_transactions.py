from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework.reverse import reverse
from rest_framework import status
from .models import Transaction, User, Circle, CircleUser, CircleUserAccount, CircleAccount, TransactionStatus
# from django.contrib.auth.models import User
from django.test import TestCase
#from django.urls import reverse

from datetime import date
from django_seed import Seed

class TransactionTestCase(APITestCase):
    """
    Test the Circles app.
    """
    def setUp(self):
        # Users
        self.seeder = Seed.seeder()
        self.username = self.seeder.faker.user_name()
        self.password = self.seeder.faker.password()
        self.executor = User.objects.create_user(username=self.username,
                                                 password=self.password)

        url = reverse('user_login')
        response = self.client.post(url, {'username': self.username,
                                          'password': self.password})
        self.assertIn('token', response.data)
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    response.data['token']))

        # Circle
        self.circle_data = {
                            'name': 'rosca',
                            'start_date': date(2010, 1, 1)
                            }
        self.circle_response = self.client.post(reverse('circle-list'),
                                         self.circle_data,
                                         format="json")

        for _ in range(0, 2):
            self.temp_response = self.client.post(reverse('user_register'),
                                {
                                  'username': self.seeder.faker.user_name(),
                                  'password': self.seeder.faker.password()
                                })
            self.circleuser_data = {
                                     'circle': self.circle_response.data['url'],
                                     'user': self.temp_response.data['user']['url']
                                    }

            self.circleuser_response = self.client.post(reverse('circleuser-list'),
                                                        self.circleuser_data)

    # test set-up
    def test_can_create_circle(self):
        self.assertEqual(self.circle_response.status_code, status.HTTP_201_CREATED)

    def test_can_create_circleuser(self):
        self.assertEqual(self.circleuser_response.status_code, status.HTTP_201_CREATED)

    def test_is_account_created_with_circle(self):
        response = self.client.get(reverse('circleaccount-detail',
                                   args=[self.circle_response.data['id']]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_is_account_created_with_circleuser(self):
        response = self.client.get(reverse('circleuseraccount-detail',
                                   args=[self.circleuser_response.data['id']])
                                   )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test transactions
    def test_can_make_deposit_request(self):
        pass

    def test_executor_can_approve_pending_deposit(self):
        pass

    def test_executor_can_reject_pending_deposit(self):
        pass

    def test_transactions_fail_if_user_not_part_of_circle(self):
        pass

    def test_can_make_withdrawal_request(self):
        pass

    def test_executor_can_approve_pending_withdrawal(self):
        pass

    def test_executor_can_reject_pending_withdrawal(self):
        pass

    def test_user_cannot_update_transaction(self):
        pass
