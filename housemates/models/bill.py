from django.db import models
from django.conf import settings
# Housemates models
from housemates.models.base_model import BaseModel
from housemates.models.recurring_bill import RecurringBill


class Bill(BaseModel):
    is_prorated = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)
    split_total = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    # Related models
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="bills_due", on_delete=models.CASCADE
    )
    recurring_bill = models.ForeignKey(
        RecurringBill, related_name="bills_due", on_delete=models.CASCADE, blank=True, null=True)
