from rest_framework import serializers
from housemates.models.house import House
from housemates.models.item import Item


class HouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = House
        fields = ('nickname',)


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('name', 'price', 'original_buyer')

    def create(self, validated_data):
        instance = super(ItemSerializer, self).create(validated_data)
        instance.owned_by.add(self.context['request'].user)
        return instance
