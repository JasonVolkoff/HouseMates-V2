# Rest framework
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
# Serializers
from housemates.house.serializers import HouseSerializer, ItemSerializer
# Custom models
from housemates.models.house import House


class ListCreateHouseAPIView(APIView):

    def post(self, request):
        # TODO: Perform check if the user still has items associated with
        # a previous house.
        serializer = HouseSerializer(
            data=request.data)
        if serializer.is_valid():
            house = serializer.save()
            user = request.user
            user.house = house
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        try:
            house = House.objects.get(users=request.user)
        except:
            raise NotFound(detail="No houses associated with user.", code=404)
        serializer = HouseSerializer(house)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DetailHouseAPIView(APIView):

    def get_house(self, request, id):
        try:
            return House.objects.get(id=id, owned_by=request.user)
        except:
            raise NotFound(detail="The item does not exist", code=404)

    def get(self, request, id):
        house = self.get_house(request, id)
        serializer = HouseSerializer(house)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        item = self.get_house(request, id)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """
        Does not completely delete the resource, however it will remove
        the request user's ownership of the item.
        """
        item = self.get_item(request, id)
        try:
            item.remove_ownership(request.user)
            serializer = ItemSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("Error", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
