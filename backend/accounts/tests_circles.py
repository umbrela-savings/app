from rest_framework.test import APIRequestFactory, APITestCase
from .serializers import CircleSerializer, CircleUserSerializer
from .models import Circle, CircleUser, User
# from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from datetime import date

class CircleTestCase(APITestCase):
    """
    Test the Circles app.
    """
    def setUp(self):
        # Users
        self.username = 'john.doe'
        self.password = 'missing2'

        self.nancy = User.objects.create(username='Nancy')
        self.victor = User.objects.create_user(username=self.username,
                                               password=self.password)
        self.jurl = User.objects.create(username='Jurl')

        # Log-in Victor
        url = reverse('user_login')
        response = self.client.post(url, {'username': self.username,
                                          'password': self.password})

        self.assertIn('token', response.data)
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    response.data['token']))

        # Circle
        self.rosca = Circle.objects.create(name='ROSCA', start_date=date(2010, 1, 1))
        self.cundina = Circle.objects.create(name='Cundina', start_date=date(2010, 1, 1))

        self.circle_name = 'tanda'
        self.start_date = date(2020, 1, 1)

    # user can create circle
    def test_circle_created(self):
        """
        Circle created as expected
        """
        url = reverse('circles-list')
        response = self.client.post(url, {'name': self.circle_name,
                                          'start_date': self.start_date})

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['name'], self.circle_name)
        self.assertEqual(response.data['users'][0]['username'], self.username)

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.data[-1]['name'], self.circle_name)

    def test_circle_create_has_error_as_expected(self):
        """
        Circle requires certain information, otherwise raise exception
        """
        pass

    def test_circle_user_table_created(self):
        """
        Membership is tracked in CircleUser table
        """
        # Set-up
        url = reverse('circles-list')

        for _ in range(1, 5):
            response = self.client.post(url, {'name': self.circle_name,
                                              'start_date': self.start_date})

        self.assertEqual(response.status_code, 201)

        circle_id = response.data['circle']
        user_id = response.data['user']

        # test circleuser
        url = reverse('circleusers-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.data[-1]['circle'], circle_id)
        self.assertEqual(response.data[-1]['user'], user_id)

        # test filtering circle_user
        url += "?user_id={}".format(user_id)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        [self.assertEqual(circleuser['user'], user_id) for circleuser in response.data]


    def test_circle_requires_permissions(self):
        """
        Only authenticated users who are (pending) members of the circle
        can view the circle.
        """
        pass

    def test_circle_can_be_updated(self):
        """
        Update circle rules
        """
        pass

    def test_add_user_to_circle_user_table(self):
        """
        User added to CircleUser table
        """
        pass

    def test_circle_invitation_creates_pending_user(self):
        pass

    def test_added_user_accepts_spot_in_circle(self):
        """
        NEXT USER STORY
        """
        pass

    def test_set_user_to_not_active_in_circle_user_table(self):
        """
        NEXT USER STORY (in place of "delete")
        """
        pass

#
# class CircleUserThroughTest(TestCase):
#     def setUp(self):
#         # Create three people:
#         self.nancy = User.objects.create(username='Nancy')
#         self.victor = User.objects.create(username='Victor')
#         self.jurl = User.objects.create(username='Jurl')
#
#         # And three groups:
#         self.tanda = Circle.objects.create(name='Tanda', start_date=date(2010,1,1))
#         self.rosca = Circle.objects.create(name='ROSCA', start_date=date(2010,1,1))
#         self.cundina = Circle.objects.create(name='Cundina', start_date=date(2010,1,1))
#
#         # Every user is a member of every circle, but
#         # nancy started tanda, victor started rosca, and jurl started cundina.
#         CircleUser.objects.create(user=self.nancy, circle=self.tanda, is_active=True)
#         CircleUser.objects.create(user=self.victor, circle=self.tanda, is_active=False)
#         CircleUser.objects.create(user=self.jurl, circle=self.tanda, is_active=False)
#
#         CircleUser.objects.create(user=self.nancy, circle=self.rosca, is_active=False)
#         CircleUser.objects.create(user=self.victor, circle=self.rosca, is_active=True)
#         CircleUser.objects.create(user=self.jurl, circle=self.rosca, is_active=False)
#
#         CircleUser.objects.create(user=self.nancy, circle=self.cundina, is_active=False)
#         CircleUser.objects.create(user=self.victor, circle=self.cundina, is_active=False)
#         CircleUser.objects.create(user=self.jurl, circle=self.cundina, is_active=True)
#
#     def test_unfiltered_membership(self):
#         # Which circles is victor in?
#         victors_circles = Circle.objects.filter(users=self.victor)
#         self.assertEqual(list(victors_circles), [self.tanda, self.rosca, self.cundina])
#
#     def test_is_active_circles(self):
#         # But which circles does victor admin?
#         victor_started = Circle.objects.filter(users=self.victor, circleuser__is_active=True)
#         self.assertEqual(list(victor_started), [self.rosca])
#
#     def test_member_circles(self):
#         # And which groups is jurl just a member of?
#         jurl_invited = Circle.objects.filter(users=self.jurl, circleuser__is_active=False)
#         self.assertEqual(list(jurl_invited), [self.tanda, self.rosca])
