from django.urls import path
from housemates.house.views import ListCreateHouseAPIView, ListCreateItemAPIView

# Full base route `api/house`
urlpatterns = [
    path('', ListCreateHouseAPIView.as_view(), name="house"),
    path('item/', ListCreateItemAPIView.as_view(), name="item"),
]
