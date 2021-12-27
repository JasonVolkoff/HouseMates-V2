from django.conf import settings
from django.db import models, transaction
# Housemates models
from housemates.models.base_model import BaseModel
from housemates.models.house import House
from housemates.models.notification import Notification


class Invite(BaseModel):
    INVITE_TYPES = (
        ("BILL", "Bill"),
        ("HOUSE", "House"),
        ("EVENT", "Event"),
    )
    invite_type = models.CharField(max_length=15, choices=INVITE_TYPES)
    invitee = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="pending_invites", on_delete=models.CASCADE)
    inviter = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="sent_invites", on_delete=models.CASCADE)
    house = models.ForeignKey(
        House, related_name="invites", on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self._handle_init_notification()

        return super(Invite, self).save(*args, **kwargs)

    def accept_invite(self):
        """
        Depending on invite type, will call appropriate acceptance action.
        """
        if self.invite_type == "BILL":
            pass
        elif self.invite_type == "HOUSE":
            pass
        elif self.invite_type == "EVENT":
            pass

    def decline_invite(self):
        """
        Depending on invite type, will call appropriate decline action.
        """
        if self.invite_type == "BILL":
            pass
        elif self.invite_type == "HOUSE":
            pass
        elif self.invite_type == "EVENT":
            pass

    def _handle_init_notification(self):
        if self.invite_type == "HOUSE":
            housemates = self.house.users.all()
            self._handle_create_atomic_notification(
                "HOUSE_INVITE", "INVITED", housemates)
        elif self.invite_type == "BILL":
            pass

    def _handle_response_notification(self, response):
        housemates = self.house.users.all()

    def _handle_create_atomic_notification(self, notification_type, action_verb, housemates):
        with transaction.atomic():
            for user in housemates:
                Notification.objects.create(
                    notification_type=notification_type,
                    action_verb=action_verb,
                    sender=self.inviter,
                    receiver=self.invitee,
                    user=user
                )
