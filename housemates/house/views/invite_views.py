# Rest framework
from rest_framework import serializers, status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
# Serializers
from housemates.house.serializers import InviteSerializer
# Custom models
from housemates.models.house import House


class CreateInviteAPIView(APIView):

    def post(self, request, pk=None):
        serializer = InviteSerializer(data=request.data)

        if serializer.is_valid():
            invite = serializer.save(
                inviter=request.user,
                house=request.user.house,
                recurring_bill=pk
            )
