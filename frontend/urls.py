from django.urls import path
from .views import index
# Full base route `/`

urlpatterns = [
    path('', index)
]