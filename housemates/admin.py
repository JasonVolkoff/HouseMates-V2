from django.contrib import admin
from housemates.models.user import User
from housemates.models.house import House
from housemates.models.item import Item
# Register your models here.
admin.site.register(User)
admin.site.register(House)
admin.site.register(Item)