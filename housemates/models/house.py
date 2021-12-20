from django.db import models
from housemates.models.base_model import BaseModel


class House(BaseModel):
    nickname = models.CharField(max_length=50)
