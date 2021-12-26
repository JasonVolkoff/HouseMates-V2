from django.db import models
from django.conf import settings
from housemates.models.house import House
from housemates.models.calendar_event import CalendarEvent
from housemates.models.base_model import BaseModel


class Bill(BaseModel):
    name = models.CharField(max_length=50)
    notes = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # Related models
    payable_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="bills_managed", on_delete=models.PROTECT, blank=True, null=True)
    house = models.ForeignKey(
        House, related_name="recurring_bills", on_delete=models.SET_NULL, blank=True, null=True)
    billed_to = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="users_bills")
    recurring_event = models.OneToOneField(
        CalendarEvent, related_name="bill", on_delete=models.SET_NULL, blank=True, null=True)
