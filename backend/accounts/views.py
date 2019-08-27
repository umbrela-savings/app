from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, serializers, permissions, status, mixins
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .models import *
from .serializers import *

from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils.crypto import get_random_string
import uuid

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
            raise serializers.ValidationError("User must be authenticated to create a Circle")
        serializer.save(executor=self.request.user)

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
    serializer_class = CircleUserSerializer
    # authentication_classes = (TokenAuthentication,)
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
    serializer_class = CircleUserAccountSerializer

    def get_queryset(self):
        """
        Returns the queryset object for CircleUsers.
        We can optionally filter by user_id and circle_id.
        """
        queryset = CircleUserAccount.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        circle_id = self.request.query_params.get('circle_id', None)

        if user_id is not None:
            queryset = queryset.filter(circle_user__user=user_id)

        if circle_id is not None:
            queryset = queryset.filter(circle_user__circle=circle_id)

        return queryset


class TransactionViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    """
    This viewset automatically provides `create`, `list` and `detail` actions.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionStatusViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    """
    This viewset automatically provides `create`, `list` and `detail` actions.
    """
    queryset = TransactionStatus.objects.all()
    serializer_class = TransactionStatusSerializer

    def perform_create(self, serializer):
        serializer.save(authenticated_user=self.request.user)

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
