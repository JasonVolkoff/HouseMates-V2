from rest_framework import serializers
from housemates.models.house import House
from housemates.models.invite import Invite
from housemates.models.item import Item


class HouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = House
        fields = ('id', 'nickname')


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('id', 'name', 'price', 'original_buyer', 'location',
                  'updated_at', 'created_at')

    def create(self, validated_data):
        instance = super(ItemSerializer, self).create(validated_data)
        instance.owned_by.add(self.context['request'].user)
        return instance


class InviteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invite
        fields = ('id', 'invite_type', 'invitee', 'inviter', 'house')
