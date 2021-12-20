from rest_framework import serializers
from housemates.models.house import House
from housemates.models.item import Item


class HouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = House
        fields = ('id', 'nickname', 'users')


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('id', 'name', 'price', 'original_buyer', 'location',
                  'updated_at', 'created_at')

    def create(self, validated_data):
        instance = super(ItemSerializer, self).create(validated_data)
        instance.owned_by.add(self.context['request'].user)
        return instance
