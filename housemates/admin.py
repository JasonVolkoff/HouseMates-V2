from django.contrib import admin
from housemates.models.bill import Bill
from housemates.models.calendar_event import CalendarEvent
from housemates.models.event_action import EventAction
from housemates.models.user import User
from housemates.models.house import House
from housemates.models.item import Item
# Register your models here.
admin.site.register(User)
admin.site.register(House)
admin.site.register(Item)
admin.site.register(Bill)
admin.site.register(CalendarEvent)
admin.site.register(EventAction)
