# from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, APITestCase

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .models import User
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from knox.settings import CONSTANTS, knox_settings
from knox.signals import token_expired

from django.urls import reverse

class AuthTestCase(APITestCase):
    """
    Test the Accounts app. Some tests are directly from knox AuthTestCase
    """
    def setUp(self):
        self.username = 'john.doe'
        self.email = 'john.doe@example.com'
        self.password = 'hunter2'
        self.user = User.objects.create_user(self.username, self.email, self.password)

        self.username_unregistered = 'jane.doe'
        self.email_unregistered = 'jane.doe@example.com'
        self.password_unregistered = 'hunter2'


        self.username = 'john.doe'
        #self.email = 'john.doe@example.com'
        self.password = 'hunter2'
        self.user = User.objects.create_user(self.username, self.email, self.password)


    def test_login_creates_keys(self):
        self.assertEqual(AuthToken.objects.count(), 0)
        url = reverse('user_login')
        for _ in range(5):
            self.client.post(url, {'username': self.username,
                                   'password': self.password})
        self.assertEqual(AuthToken.objects.count(), 5)
        self.assertTrue(all(e.token_key for e in AuthToken.objects.all()))

    def test_login_returns_serialized_token(self):
        self.assertEqual(AuthToken.objects.count(), 0)
        url = reverse('user_login')
        response = self.client.post(url, {'username': self.username2,
                                          'password': self.password2})
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.data)
        username_field = self.user.USERNAME_FIELD
        self.assertNotIn(username_field, response.data)

    def test_bad_login_fails(self):
        self.assertEqual(AuthToken.objects.count(), 0)
        url = reverse('user_login')
        response = self.client.post(url,
                                    {'username': self.username_unregistered,
                                     'password': self.password_unregistered})
        self.assertEqual(response.status_code, 400)
        self.assertIn('non_field_errors', response.data)

    def test_can_register_new_user(self):
        self.assertEqual(AuthToken.objects.count(), 0)
        url = reverse('user_register')
        response = self.client.post(url,
                                    {'username': self.username_unregistered,
                                     'password': self.password_unregistered})
        self.assertIn('token', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.username_unregistered,
                         response.data["user"]["username"])

    def test_re_registration_fails(self):
        url = reverse('user_register')
        response = self.client.post(url,
                                    {'username': self.username,
                                     'password': self.password})
        self.assertEqual(response.status_code, 400)

    def test_user_can_view_self_after_authentication(self):
        url = reverse('user_login')
        response = self.client.post(url, {'username': self.username,
                                          'password': self.password})
        self.assertIn('token', response.data)
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    response.data['token']))
        url = reverse('user_detail')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_can_update_self_after_authentication(self):
        pass

    def test_logout_deletes_keys(self):
        self.assertEqual(AuthToken.objects.count(), 0)
        for _ in range(2):
            instance, token = AuthToken.objects.create(user=self.user)
        self.assertEqual(AuthToken.objects.count(), 2)

        url = reverse('knox_logout')
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' % token))
        self.client.post(url, {}, format='json')
        self.assertEqual(AuthToken.objects.count(), 1,
                         'other tokens should remain after logout')

    def test_logout_all_deletes_keys(self):
        self.assertEqual(AuthToken.objects.count(), 0)
        for _ in range(10):
            instance, token = AuthToken.objects.create(user=self.user)
        self.assertEqual(AuthToken.objects.count(), 10)

        url = reverse('knox_logoutall')
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' % token))
        self.client.post(url, {}, format='json')
        self.assertEqual(AuthToken.objects.count(), 0)
