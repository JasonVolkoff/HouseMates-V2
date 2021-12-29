from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models, transaction
# Housemates models
from housemates.models.base_model import BaseModel
from housemates.models.house import House
from housemates.models.notification import Notification
from housemates.models.recurring_bill import RecurringBill
from housemates.models.user import User


class Invite(BaseModel):
    INVITE_TYPES = (
        ("BILL_INVITE", "Bill invte"),
        ("HOUSE_INVITE", "House invite"),
        ("EVENT_INVITE", "Event invite"),
    )
    invite_type = models.CharField(max_length=15, choices=INVITE_TYPES)
    invitee = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="pending_invites", on_delete=models.CASCADE)
    inviter = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="sent_invites", on_delete=models.CASCADE)
    house = models.ForeignKey(
        House, related_name="invites", on_delete=models.CASCADE, null=True, blank=True)
    recurring_bill = models.ForeignKey(
        RecurringBill, related_name="invites", on_delete=models.CASCADE, null=True, blank=True)
    # TODO: Create and add event model as foreign key

    def save(self, *args, **kwargs):
        """
        To prevent spam invites, validation to check if an invite of this type already 
        exists should be done in views.
        """
        if not self.id:
            self._handle_init_notifications()

        return super(Invite, self).save(*args, **kwargs)

    def invite_response(self, response):
        """
        Depending on invite type and response, will call appropriate action.
        `response` should be a string of either "DECLINED" or "ACCEPTED".
        The invite object will then be set to inactive.
        """
        if self.invite_type == "BILL_INVITE":
            housemates = self._get_queryset_of_foriegn_keys()
            self._handle_create_notifications(
                self.invite_type, response, housemates)
            if response == "ACCEPTED":
                self.recurring_bill.payable_by.add(self.invitee)

        elif self.invite_type == "HOUSE_INVITE":
            housemates = self.house.users.all()
            self._handle_create_notifications(
                self.invite_type, response, housemates)
            if response == "ACCEPTED":
                self.invitee.house = self.house
                self.invitee.save()

        elif self.invite_type == "EVENT_INVITE":
            housemates = self._get_queryset_of_foriegn_keys()
            self._handle_create_notifications(
                self.invite_type, response, housemates)
            if response == "ACCEPTED":
                # TODO: Handle event model
                pass

        else:
            raise ValidationError

        self.is_active = False

    def _handle_init_notifications(self):
        if self.invite_type == "HOUSE_INVITE":
            housemates = self.house.users.all()
            self._handle_create_notifications(
                self.invite_type, "INVITED", housemates)

    def _handle_create_notifications(self, notification_type, action_verb, housemates):
        with transaction.atomic():
            for user in housemates:
                Notification.objects.create(
                    notification_type=notification_type,
                    action_verb=action_verb,
                    sender=self.inviter,
                    receiver=self.invitee,
                    user=user
                )

    def _get_queryset_of_foriegn_keys(self):
        ids = []
        ids.append(self.inviter.id)
        return User.objects.filter(id__in=ids)
