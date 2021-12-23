from typing import List
from django.db import models
import datetime
from django.conf import settings

from housemates.models.base_model import BaseModel


class CalendarEvent(BaseModel):
    RECURRING_CHOICES = (
        ('NONE', 'None')
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('BIWEEKLY', 'Biweekly'),
        ('MONTHLY', 'Monthly'),
        ('YEARLY', 'YEARLY'),
    )
    repeat = models.CharField(max_length=15, choices=RECURRING_CHOICES)
    start_date = models.DateField()
    user = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="events")

    def __str__(self):
        return self.repeat

    def occurrences_between(self, start: datetime, end: datetime) -> List:
        """
        Returns an iterable of all event occurances between a start and end date.
        """
        pass

    def occurrences_this_month(self) -> List:
        """
        Returns an iterable of all event occurrances for the current month.
        """

    def occurrences_this_year(self) -> List:
        """
        Returns an iterable of all event occurances for the current year.
        """
        pass

    def change_event_date(self, date: datetime) -> None:
        """
        Changes the event occurance to a specified date
        """
        pass

    def change_event_day(self, day: str) -> None:
        """
        Changes the event occurance to a specified week day.
        ex: mon, tues, wed, etc
        """
        pass
