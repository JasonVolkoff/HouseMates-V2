from django.db import models
from django.conf import settings
# Housemates models
from housemates.models.base_model import BaseModel


class Notification(BaseModel):
    ACTION_VERBS = (
        ("INVITED", "Invited"),
        ("ACCEPTED", "Accepted"),
        ("DECLINED", "Declined"),
    )
    NOTIFICATION_TYPES = (
        ("SYSTEM", "System"),
        ("BILL_INVITE", "Bill invite"),
        ("HOUSE_INVITE", "House invite"),
        ("EVENT_INVITE", "Event invite"),
        ("GENERAL", "General"),
        ("ITEM_SPLIT", "Item split"),
    )
    read = models.BooleanField(default=False)

    notification_type = models.CharField(
        max_length=32, choices=NOTIFICATION_TYPES)
    action_verb = models.CharField(
        max_length=32, choices=ACTION_VERBS)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="notifications", on_delete=models.CASCADE)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="sent_notifications", on_delete=models.CASCADE)
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="receiver_notifications", on_delete=models.CASCADE)

    def __str__(self):
        return self.notification_type

    def save(self, *args, **kwargs):
        if not self.id:
            self._create()

        return super(Notification, self).save(*args, **kwargs)

    def _create(self):
        if self.notification_type == "HOUSE_INVITE":
            pass
