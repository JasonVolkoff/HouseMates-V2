from .views import RegisterAPIView, CurrentUserAPIView
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# Full base route `/api/`
urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name="register"),
    path('login/', CurrentUserAPIView.as_view(), name="login"),
    # Authentication
    path('api-auth/', include('rest_framework.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] 