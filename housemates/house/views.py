# Rest framework
from typing import ItemsView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
# Serializers
from housemates.house.serializers import HouseSerializer, ItemSerializer
# Custom models
from housemates.models.house import House
from housemates.models.item import Item


class ListCreateHouseAPIView(APIView):

    def post(self, request):
        # TODO: Perform check if the user still has items associated with
        # a previous house.
        serializer = HouseSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            house = serializer.save()
            user = request.user
            user.house = house
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        houses = House.objects.filter(members=request.user)
        serializer = HouseSerializer(houses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListCreateItemAPIView(APIView):

    def post(self, request):
        serializer = ItemSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(original_buyer=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """
        Returns all items associated with the current user.
        """
        items = Item.objects.filter(owned_by=request.user)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
