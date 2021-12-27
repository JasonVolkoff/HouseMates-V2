from django.contrib import admin
from housemates.models.bill import Bill
from housemates.models.calendar_event import CalendarEvent
from housemates.models.invite import Invite
from housemates.models.notification import Notification
from housemates.models.recurring_bill import RecurringBill
from housemates.models.user import User
from housemates.models.house import House
from housemates.models.item import Item
# Register your models here.
admin.site.register(User)
admin.site.register(House)
admin.site.register(Item)
admin.site.register(Bill)
admin.site.register(RecurringBill)
admin.site.register(Invite)
admin.site.register(CalendarEvent)
admin.site.register(Notification)
