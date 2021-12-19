# from django.db import models
# from django.conf import settings
# # Create your models here.
# class House(models.Model):
#     nickname = models.CharField(max_length=50)
#     members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="houses")
#     created_at = models.DateTimeField(auto_now_add=True)

# class Item(models.Model):
#     # Can be owned by multiple people. Can reference ownership history via related notifications
#     name = models.CharField(max_length=255)
#     note = models.TextField(blank=True, default='')
#     price = models.DecimalField(
#         max_digits=10, decimal_places=2, default=0)
#     owned_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="users_items")
#     current_location = models.ForeignKey(
#         House, related_name="items", on_delete=models.CASCADE, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

# class Invite(models.Model):
#     house = models.ForeignKey(
#         House, related_name="invites", on_delete=models.SET_NULL, null=True, blank=True)
#     user_receiver = models.ForeignKey(
#         settings.AUTH_USER_MODEL, related_name="invitations_received", on_delete=models.PROTECT, null=True, blank=True)
#     user_sender = models.ForeignKey(
#         settings.AUTH_USER_MODEL, related_name="invitations_sent", on_delete=models.PROTECT, null=True, blank=True)
#     accepted = models.BooleanField(default=False)
#     pending = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def accept_invite(self):
#         house = self.house
#         user = self.user_receiver
#         try:
#             # Check if house still exists
#             if not house.exists():
#                 self.house.members.add(user)
#                 self.accepted = True
#                 self.pending = False
#                 self.save()
#                 house.save()
#         except:
#             # TODO: add redirect/notification that the house no longer exists
#             pass
    
#     def decline_invite(self):
#         self.accepted = False
#         self.pending = False
    

# class Balance(models.Model):
#     bal_one = models.DecimalField(
#         max_digits=10, decimal_places=2, default=0)
#     user_one = models.ForeignKey(
#         settings.AUTH_USER_MODEL, related_name="first_balance", on_delete=models.PROTECT)
#     bal_two = models.DecimalField(
#         max_digits=10, decimal_places=2, default=0)
#     user_two = models.ForeignKey(
#         settings.AUTH_USER_MODEL, related_name="second_balance", on_delete=models.PROTECT)
#     house = models.ManyToManyField(House, related_name="house_balances")

#     def changeBalance(self, user, money):
#         if self.user_one == user:
#             self.bal_one += money
#         else:
#             self.bal_two += money
    
#     def checkBalance(self, user):
#         if self.user_one == user:
#             return self.bal_one
#         else:
#             return self.bal_two
    
# class ProfileNotification(models.Model):
#     """
#     Consists of notifications relevant to a User:
#     Invites, System notifications, Alerts
#     """
#     # First string in tuple is what is stored; second variable is descriptor
#     NOTIFICATION_TYPES = (
#         ("System", "System"),
#         ("Invite", "Invite"),
#     )
#     # TODO: Add system notifications
#     notification_type = models.CharField(max_length=25, choices=NOTIFICATION_TYPES)
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="notifications", on_delete=models.CASCADE, null=False, blank=False)    
#     invite = models.ForeignKey(Invite, null=True, blank=True, on_delete=models.CASCADE)

#     def notification_logic(self):
#         if self.notification_type is "System":
#             # TODO: Add system notification return string
#             return "System notifications have not been added yet"
#         elif self.notification_type is "Invite":
#             if not self.invite.accepted:
#                 notification = f'{self.invite.user_sender.first_name} {self.invite.user_sender.last_name} has invited you to {self.invite.house.nickname}.'
#             elif self.invite.accepted:
#                 notification = f'You have declined invite to {self.invite.house.nickname}.'
#             return notification


# class HouseNotification(models.Model):
#     """
#     Consists of notifications relevant to a house:
#     Invites, Paid balances, Items added, Chores, 
#     """
#     NOTIFICATION_TYPES = (
#         ("System", "System"),
#         ("Invite", "Invite"),
#         ("Purchase", "Purchase"),
#         ("Joined", "Joined"),
#         ("Left", "Left"),
#         ("Shared", "Shared"),
#     )
#     notification_type = models.CharField(max_length=25, choices=NOTIFICATION_TYPES)
#     invite = models.ForeignKey(Invite, related_name="notifications", on_delete=models.CASCADE, null=True, blank=True)
#     house = models.ForeignKey(House, related_name="notifications", on_delete=models.CASCADE, null=False, blank=False)
#     item = models.ForeignKey(Item, related_name="notifications", on_delete=models.SET_NULL, null=True, blank=True)

#     def notification_logic(self):
#         if self.notification_type is "System":
#             # TODO: Add system notification return string
#             pass
#         elif self.notification_type is "Invite":
#             # TODO: Figure out a way to see if the user is the one logged in (pass variable to notification logic)
#             pass