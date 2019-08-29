from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework.reverse import reverse
from rest_framework import status
from .models import Transaction, User, Circle, CircleUser, CircleUserAccount, CircleAccount, TransactionStatus
from django.test import TestCase

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
        self.executor_response = self.client.post(url, {'username': self.username,
                                          'password': self.password})
        self.assertIn('token', self.executor_response.data)
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.executor_response.data['token']))

        # Circle
        self.circle_data = {
                            'name': 'rosca',
                            'start_date': date(2010, 1, 1)
                            }
        self.circle_response = self.client.post(reverse('circle-list'),
                                         self.circle_data,
                                         format="json")


        self.temp_response = self.client.post(reverse('user_register'),
                            {
                              'username': self.seeder.faker.user_name(),
                              'password': self.seeder.faker.password()
                            })
        self.non_circle_user_response = self.client.post(reverse('user_register'),
                            {
                              'username': "sandy",
                              'password': self.seeder.faker.password()
                            })

        self.circleuser_data = {
                                 'circle': self.circle_response.data['url'],
                                 'user': self.temp_response.data['user']['url']
                                }

        self.circleuser_response = self.client.post(reverse('circleuser-list'),
                                                    self.circleuser_data)

        self.circleaccount_response = self.client.get(reverse('circleaccount-detail',
                                        args=[self.circle_response.data['id']]))

        self.circleuseraccount_response = self.client.get(reverse('circleuseraccount-detail',
                                         args=[self.circleuser_response.data['id']]))

        self.client.credentials(HTTP_AUTHORIZATION=None)

        # Transactions
        # pending deposit
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.temp_response.data['token']))

        self.deposit_amount = self.seeder.faker.random_int(20,40)
        self.deposit_data = {
                        'amount': self.deposit_amount,
                        'type': 'DP',
                        'circle_account': self.circleaccount_response.data['url'],
                        'account': self.circleuseraccount_response.data['url']
                        }
        self.deposit_response = self.client.post(reverse('transaction-list'),
                                             self.deposit_data)

        # pending withdrawal (cannot make the withdrawal without finalizing deposit)
        self.withdrawal_amount = self.seeder.faker.random_int(10,19)
        self.withdrawal_data = {
                        'amount': self.withdrawal_amount,
                        'type': 'WD',
                        'circle_account': self.circleaccount_response.data['url'],
                        'account': self.circleuseraccount_response.data['url']
                        }

        self.client.credentials(HTTP_AUTHORIZATION=None)

    # test set-up
    def test_can_create_circle(self):
        self.assertEqual(self.circle_response.status_code, status.HTTP_201_CREATED)

    def test_can_create_circleuser(self):
        self.assertEqual(self.circleuser_response.status_code, status.HTTP_201_CREATED)

    def test_is_account_created_with_circle(self):
        self.assertEqual(self.circleaccount_response.status_code, status.HTTP_200_OK)

    def test_is_account_created_with_circleuser(self):
        self.assertEqual(self.circleuseraccount_response.status_code, status.HTTP_200_OK)

    # test transactions


    def test_can_make_deposit_request(self):

        self.assertEqual(self.deposit_response.status_code, status.HTTP_201_CREATED)

        # transaction status set to pending
        self.assertEqual(self.deposit_response.data['status'], "pending")

        # accounts are updated
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.temp_response.data['token']
                                                    )
                                )

        for account in [self.circleuseraccount_response, self.circleaccount_response]:
            response = self.client.get(account.data['url'])
            self.assertEqual(response.status_code, status.HTTP_200_OK)


            self.assertEqual(response.data['pending_deposits'],
                             self.deposit_amount)

            self.assertEqual(response.data['deposits'],
                             0)


    def test_executor_can_approve_pending_deposit(self):

        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.executor_response.data['token']))

        transaction_status = {'transaction_id': self.deposit_response.data['url'],
                              'status': 'approved'}


        approved_response = self.client.post(reverse('transactionstatus-list'),
                                             transaction_status)

        self.assertEqual(approved_response.status_code, status.HTTP_201_CREATED)

        for account in [self.circleuseraccount_response, self.circleaccount_response]:
            response = self.client.get(account.data['url'])
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['pending_deposits'],
                             0)
            self.assertEqual(response.data['deposits'],
                             self.deposit_amount)



    def test_executor_can_reject_pending_deposit(self):
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.executor_response.data['token']
                                                    )
                                )

        transaction_status = {'transaction_id': self.deposit_response.data['url'],
                              'status': 'rejected'}


        rejected_response = self.client.post(reverse('transactionstatus-list'),
                                             transaction_status
                                             )

        self.assertEqual(rejected_response.status_code, status.HTTP_201_CREATED)

        for account in [self.circleuseraccount_response, self.circleaccount_response]:
            response = self.client.get(account.data['url'])
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            self.assertEqual(response.data['pending_deposits'],
                             0)

            self.assertEqual(response.data['deposits'],
                             0)

    def test_non_executor_cannot_approve_pending_deposit(self):

        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.temp_response.data['token']
                                                    )
                                )

        transaction_status = {'transaction_id': self.deposit_response.data['url'],
                              'status': 'approved'}


        bad_response = self.client.post(reverse('transactionstatus-list'),
                                             transaction_status
                                             )

        self.assertEqual(bad_response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_transactions_fail_if_user_not_part_of_circle(self):

        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.non_circle_user_response.data['token']
                                                    )
                                )

        circle_data = {
                        'name': 'tanda',
                        'start_date': date(2010, 1, 1)
                       }
        other_circle_response = self.client.post(reverse('circle-list'),
                                                circle_data)

        circle_id = {'circle_id': other_circle_response.data['id']}
        other_circleuser_response = self.client.get(reverse('circleuser-list'), circle_id)

        other_circleuseraccount_response = self.client.get(reverse('circleuseraccount-detail',
                                         args=[other_circleuser_response.data[0]['id']]))

        bad_deposit_data = {
                        'amount': self.deposit_amount,
                        'type': 'DP',
                        'circle_account': self.circleaccount_response.data['url'],
                        'account': other_circleuseraccount_response.data['url']
                        }

        bad_deposit_response = self.client.post(reverse('transaction-list'),
                                            bad_deposit_data)

        self.assertEqual(bad_deposit_response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.credentials(HTTP_AUTHORIZATION=None)

    def test_user_can_withdraw_request_for_pending_deposit(self):
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' % self.temp_response.data['token']))

        transaction_status = {'transaction_id': self.deposit_response.data['url'],
                              'status': 'withdrawn'}

        status_response = self.client.post(reverse('transactionstatus-list'),
                                             transaction_status)

        self.assertEqual(status_response.status_code, status.HTTP_201_CREATED)

        for account in [self.circleuseraccount_response, self.circleaccount_response]:
            response = self.client.get(account.data['url'])
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['pending_deposits'], 0)
            self.assertEqual(response.data['deposits'], 0)

    def test_can_make_withdrawal_request(self):

        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.executor_response.data['token']))

        transaction_status = {'transaction_id': self.deposit_response.data['url'],
                              'status': 'approved'}

        approved_response = self.client.post(reverse('transactionstatus-list'),
                                             transaction_status)

        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.temp_response.data['token']))

        withdrawal_response = self.client.post(reverse('transaction-list'),
                                                    self.withdrawal_data)

        self.assertEqual(withdrawal_response.status_code, status.HTTP_201_CREATED)

        # transaction status set to pending
        self.assertEqual(withdrawal_response.data['status'], "pending")


        # accounts are updated
        for account in [self.circleuseraccount_response, self.circleaccount_response]:
            response = self.client.get(account.data['url'])
            self.assertEqual(response.status_code, status.HTTP_200_OK)


            self.assertEqual(response.data['pending_withdrawals'],
                             self.withdrawal_amount)

            self.assertEqual(response.data['withdrawals'],
                             0)

    def test_executor_can_approve_pending_withdrawal(self):
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.executor_response.data['token']))

        transaction_status = {'transaction_id': self.deposit_response.data['url'],
                              'status': 'approved'}

        approved_response = self.client.post(reverse('transactionstatus-list'),
                                             transaction_status)

        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.temp_response.data['token']))

        withdrawal_response = self.client.post(reverse('transaction-list'),
                                                    self.withdrawal_data)


        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.executor_response.data['token']
                                                    )
                                )

        transaction_status = {'transaction_id': withdrawal_response.data['url'],
                              'status': 'approved'}


        approved_response = self.client.post(reverse('transactionstatus-list'),
                                             transaction_status
                                             )

        self.assertEqual(approved_response.status_code, status.HTTP_201_CREATED)

        for account in [self.circleuseraccount_response, self.circleaccount_response]:
            response = self.client.get(account.data['url'])

            self.assertEqual(response.status_code, status.HTTP_200_OK)

            self.assertEqual(response.data['pending_withdrawals'],
                             0)

            self.assertEqual(response.data['withdrawals'],
                             self.withdrawal_amount)


    def test_user_cannot_withdraw_more_than_pot_size(self):
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                    self.temp_response.data['token']))

        bad_withdrawal_response = self.client.post(reverse('transaction-list'),
                                                    self.withdrawal_data)

        self.assertEqual(bad_withdrawal_response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_user_cannot_request_more_than_credit_line(self):
        pass

    def test_users_cannot_update_transaction(self):
        for user in [self.temp_response, self.executor_response]:
            self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                        user.data['token'])
                                    )

            updated_deposit_data = self.deposit_data

            updated_deposit_data['amount'] = 1

            updated_deposit_data_response = self.client.post(self.deposit_response.data['url'],
                             updated_deposit_data)

            self.assertEqual(updated_deposit_data_response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_users_cannot_change_non_pending_transaction_status(self):
        self.client.credentials(HTTP_AUTHORIZATION = ('Token %s' %
                                                      self.executor_response.data['token']
                                                      )
                                )

        transaction_status = {'transaction_id': self.deposit_response.data['url'],
                              'status': 'approved'}


        self.client.post(reverse('transactionstatus-list'),
                         transaction_status
                        )

        for user in [self.temp_response, self.executor_response]:
            self.client.credentials(HTTP_AUTHORIZATION=('Token %s' %
                                                        user.data['token']
                                                        )
                                    )

            transaction_status = {'transaction_id': self.deposit_response.data['url'],
                                  'status': 'rejected'}


            try_to_reject_response = self.client.post(reverse('transactionstatus-list'),
                                                 transaction_status)

            self.assertEqual(try_to_reject_response.status_code, status.HTTP_400_BAD_REQUEST)
