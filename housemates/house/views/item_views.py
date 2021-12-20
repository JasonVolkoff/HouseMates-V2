# Rest framework
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
# Serializers
from housemates.house.serializers import ItemSerializer
# Custom models
from housemates.models.house import House
from housemates.models.item import Item


class ListCreateItemAPIView(APIView):

    def post(self, request):
        """
        Creates the item and sets the current user and house (if 
        in the request data).
        """
        house_id = request.data.get('house', None)
        house = None
        if house_id:
            try:
                house = House.objects.get(id=house_id)
            except:
                return Response("Invalid house ID", status=status.HTTP_404_NOT_FOUND)
        serializer = ItemSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(original_buyer=self.request.user,
                            location=house)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """
        Returns all items associated with the current user.
        """
        items = Item.objects.filter(owned_by=request.user)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DetailItemAPIView(APIView):
    def get_item(self, request, id):
        try:
            return Item.objects.get(id=id, owned_by=request.user)
        except:
            raise NotFound(detail="The item does not exist", code=404)

    def get(self, request, id):
        item = self.get_item(request, id)
        serializer = ItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        item = self.get_item(request, id)
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
