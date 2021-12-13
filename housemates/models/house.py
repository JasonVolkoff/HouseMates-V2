from django.db import models
from housemates.models.user import User


class House(models.Model):
    nickname = models.CharField(max_length=50)
    members = models.ManyToManyField(User, related_name="houses")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)