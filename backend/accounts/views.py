# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, serializers
from django.contrib.auth.models import User
from .models import Circle, CircleUser
from .serializers import UserSerializer, CircleSerializer, CircleUserSerializer

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
    # def get_queryset(self):
    #     return self.request.user.circles.all()

    # def list(self, request):
    #     queryset = self.get_queryset()
    #     serializer = CircleSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    # def highlight(self, request, *args, **kwargs):
    #     snippet = self.get_object()
    #     return Response(snippet.highlighted)

    def perform_create(self, serializer):
         if not self.request.user.is_authenticated:
             raise serializers.ValidationError("User must be authenticated to create a Circle")
         serializer.save(creator=self.request.user)

class CircleUserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    queryset = CircleUser.objects.all()
    serializer_class = CircleUserSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly,)
