from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, serializers, permissions, status
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .models import *
from .serializers import *

from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

User = get_user_model()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CircleViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    serializer_class = CircleSerializer
    queryset = Circle.objects.all()

    # def list(self, request):
    #     queryset = self.get_queryset()
    #     serializer = CircleSerializer(queryset, many=True)
    #     return Response(serializer.data)


    def perform_create(self, serializer):
        """

        """
        if not self.request.user.is_authenticated:
            print(self.request.user)
            raise serializers.ValidationError("User must be authenticated to create a Circle")
        serializer.save(creator=self.request.user)

    @action(methods=['get'], detail=False, url_path='join_code/(?P<join_code>\w+)')
    def get_by_join_code(self, request, join_code):

        serializer_context = {
                                'request': request,
                              }
        circle = get_object_or_404(Circle, join_code=join_code)

        return Response(CircleSerializer(circle, context=serializer_context).data,
                        status=status.HTTP_200_OK)


class CircleUserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    serializer_class = CircleUserSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly,)

    def get_queryset(self):
        """
        Returns the queryset object for CircleUsers.
        We can optionally filter by user_id and circle_id.
        """
        queryset = CircleUser.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        circle_id = self.request.query_params.get('circle_id', None)

        if user_id is not None:
            queryset = queryset.filter(user=user_id)

        if circle_id is not None:
            queryset = queryset.filter(circle=circle_id)

        return queryset


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        """
        Returns the queryset object for Messages which requires a circle_id in
        the URL
        """
        circle_id = self.request.query_params.get('circle_id', None)

        if circle_id is None:
            raise serializers.ValidationError("circle_id must be specified in url")
        return Message.objects.filter(circle=circle_id).order_by("-created_at")


class CircleAccountViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = CircleAccount.objects.all()
    serializer_class = CircleAccountSerializer

class CircleUserAccountViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = CircleUserAccount.objects.all()
    serializer_class = CircleUserAccountSerializer

class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    # @db_transaction.atomic()
    # def create_transaction(self, amount, is_deposit):
    #     transaction_id = get_join_code()
    #     circle = Circle.objects.get(pk=self.circle)
    #     user = User.objects.get(pk=self.user)
    #
    #     if is_deposit:
    #         type = self.DEPOSIT
    #     else:
    #         type = self.WITHDRAWL
    #
    #     # write transaction as deposit to circle_user
    #     user_transaction = Transaction.object.create(
    #                 transaction_id=transaction_id,
    #                 circle=circle,
    #                 user=user,
    #                 type=type,
    #                 amount=amount
    #                 )
    #     user_transaction.save()
    #     # write transaction as deposit to circle (Is this necessary?)
    #     circle_transaction = Transaction.object.create(
    #                 transaction_id=transaction_id,
    #                 circle=circle,
    #                 type=type,
    #                 amount=amount
    #                 )
    #     circle_transaction.save()
    #     # look up circle_user account
    #     # add amount to account
    #     self.set_pending_funds(delta=amount, is_depost=is_deposit)
    #
    #     # look up circle account
    #     circle_account = CircleAccount.objects.get(circle=circle)
    #     # add amount to account
    #     circle_account.set_pending_funds(delta=amount, is_deposit=is_deposit)
    #
    #     return
    #
    # def reject_transaction(self, amount, is_deposit):
    #     self.create_transaction(-1*amount, not is_deposit)
    #     return
