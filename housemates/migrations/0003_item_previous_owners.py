# Generated by Django 3.2.9 on 2021-12-19 21:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('housemates', '0002_auto_20211218_2218'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='previous_owners',
            field=models.ManyToManyField(related_name='previously_owned_items', to=settings.AUTH_USER_MODEL),
        ),
    ]
