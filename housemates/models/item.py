from django.db import models
from housemates.models.base_model import BaseModel
from housemates.models.house import House
from housemates.models.user import User


class Item(BaseModel):
    # Can be owned by multiple people. Can reference ownership history via related notifications
    name = models.CharField(max_length=255)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    owned_by = models.ManyToManyField(User, related_name="users_items")
    location = models.ForeignKey(
        House, related_name="items", on_delete=models.SET_NULL, null=True, blank=True)
    previous_owners = models.ManyToManyField(
        User, related_name="previously_owned_items")

    def __str__(self):
        return self.name

    def remove_ownership(self, user):
        """
        Removes ownership of the item and sets user to a previous owner.
        If no one currently owns the item, set item to inactive.
        """
        self.owned_by.remove(user)
        self.previous_owners.add(user)
        if self.owned_by.count() == 0:
            self.is_active = False
            self.save()
