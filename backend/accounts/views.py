from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, serializers, permissions, status
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Circle, CircleUser, Message
from .serializers import UserSerializer, CircleSerializer, CircleUserSerializer, MessageSerializer

from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.
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

    # @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    # def highlight(self, request, *args, **kwargs):
    #     snippet = self.get_object()
    #     return Response(snippet.highlighted)

    def perform_create(self, serializer):
        """

        """
        if not self.request.user.is_authenticated:
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
