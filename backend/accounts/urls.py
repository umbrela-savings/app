from django.urls import path, include
from .api import RegisterAPI, LoginAPI
from knox import views as knox_views
from rest_framework.routers import DefaultRouter
from accounts import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'circles', views.CircleViewSet, basename='circle')
router.register(r'circleusers', views.CircleUserViewSet, basename='circleuser')
router.register(r'users', views.UserViewSet)
router.register(r'messages', views.MessageViewSet, basename='message')
router.register(r'accounts', views.CircleUserAccountViewSet, basename='circleuseraccount')
router.register(r'circle_accounts', views.CircleAccountViewSet, basename='circleaccount')
router.register(r'transactions', views.TransactionViewSet, basename='transaction')
router.register(r'transaction_statuses', views.TransactionStatusViewSet, basename='transactionstatus')


urlpatterns = [
    path('', include(router.urls)),
    path('auth/register', RegisterAPI.as_view(), name='user_register'),
    path('auth/login', LoginAPI.as_view(), name='user_login'),
    path('auth/logout',
         knox_views.LogoutView.as_view(),
         name='knox_logout')
]
