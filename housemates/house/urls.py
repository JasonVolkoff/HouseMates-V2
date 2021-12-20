from django.urls import path
from housemates.house.views.house_views import (
    ListCreateHouseAPIView,
    DetailHouseAPIView
)
from housemates.house.views.item_views import (
    ListCreateItemAPIView,
    DetailItemAPIView
)

# Full base route `api/house`
urlpatterns = [
    path('', ListCreateHouseAPIView.as_view(), name="house"),
    path('<id>', DetailHouseAPIView.as_view(), name="house_detail"),
    path('items/', ListCreateItemAPIView.as_view(), name="item"),
    path('items/<id>', DetailItemAPIView.as_view(), name="item_detail"),
]
