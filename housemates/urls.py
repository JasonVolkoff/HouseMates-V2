from django.urls import path, include

# Full base route `/api`

urlpatterns = [
    path('', include('housemates.authentication.urls')),
    path('profile/', include('housemates.profile.urls')),
    path('house/', include('housemates.house.urls')),
]
