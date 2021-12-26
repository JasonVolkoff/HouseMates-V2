from django.conf import settings
from django.db import models


class EventAction(models.Model):
    ACTION_TYPES = (
        ("PAID", " paid on "),
        ("LATE", " was late on "),
        ("PAID_LATE", " paid late on "),
    )
    action_time = models.DateTimeField(auto_now_add=True)
    action = models.CharField(choices=ACTION_TYPES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="event_actions",
                             on_delete=models.SET_NULL, null=True, blank=True)
