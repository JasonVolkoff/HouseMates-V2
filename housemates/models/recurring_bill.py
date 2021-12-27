from django.conf import settings
from django.db import models
# Housemates models
from housemates.models.base_model import BaseModel
from housemates.models.calendar_event import CalendarEvent
from housemates.models.house import House
from housemates.models.invite import Invite


class RecurringBill(BaseModel):
    BILL_TYPES = (
        ("ELECTRIC", "Electric"),
        ("WATER_SEWAGE", "Water and sewage"),
        ("TRASH", "Trash disposal"),
        ("RENT", "Rent"),
        ("INTERNET", "Internet"),
        ("PHONE", "Phone"),
        ("GROCERIES", "Groceries"),
        ("FOOD", "Food"),
        ("OTHER", "Other"),
    )
    bill_type = models.CharField(max_length=50, choices=BILL_TYPES)
    notes = models.TextField(blank=True, null=True)
    amount_total = models.DecimalField(max_digits=10, decimal_places=2)
    payable_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="bills_managed", on_delete=models.SET_NULL, null=True, blank=True)
    payable_by = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="recurring_bills")
    house = models.ForeignKey(
        House, related_name="recurring_bills", on_delete=models.SET_NULL, blank=True, null=True)
    invites = models.ForeignKey(
        Invite, related_name="recurring_bill", on_delete=models.SET_NULL, null=True, blank=True)
    calendar_event = models.OneToOneField(
        CalendarEvent, related_name="recurring_bill", on_delete=models.CASCADE)
