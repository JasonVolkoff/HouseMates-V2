from django.db import models
from housemates.models.house import House
from housemates.models.user import User
from housemates.models.base_model import BaseModel


class RecurringBill(BaseModel):
    payable_to = models.ForeignKey(
        User, related_name="bills_managed", on_delete=models.PROTECT, blank=True, null=True)
    house = models.ForeignKey(
        House, related_name="recurring_bills", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    billed_to = models.ManyToManyField(User, related_name="users_bills")
