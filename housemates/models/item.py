from django.db import models
from housemates.models.house import House
from housemates.models.user import User

class Item(models.Model):
    # Can be owned by multiple people. Can reference ownership history via related notifications
    name = models.CharField(max_length=255)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    original_buyer = models.ForeignKey(User, related_name="purchased_items", on_delete=models.SET_NULL, null=True, blank=True)
    owned_by = models.ManyToManyField(User, related_name="users_items")
    location = models.ForeignKey(
        House, related_name="items", on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
