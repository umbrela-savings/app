from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view(), name='user_register'),
    path('api/auth/login', LoginAPI.as_view(), name='user_login'),
    path('api/auth/user', UserAPI.as_view(), name='user_detail'),
    path('api/auth/logout',
         knox_views.LogoutView.as_view(),
         name='knox_logout')
]
