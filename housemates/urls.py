from django.urls import path, include

# Full base route `/api`

urlpatterns = [
    path('', include('housemates.login.urls')),
    path('profile/', include('housemates.profile.urls')),
    path('house/', include('housemates.house.urls')),
]