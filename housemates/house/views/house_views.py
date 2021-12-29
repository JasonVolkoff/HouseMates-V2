# Rest framework
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
# Serializers
from housemates.house.serializers import HouseSerializer
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
            house = request.user.house
        except:
            raise NotFound(detail="No houses associated with user.", code=404)
        serializer = HouseSerializer(house)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DetailHouseAPIView(APIView):

    def put(self, request, id):
        house = House.objects.get(id=id)
        serializer = HouseSerializer(house, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
