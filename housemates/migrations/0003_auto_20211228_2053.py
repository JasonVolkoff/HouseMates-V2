# Generated by Django 3.2.9 on 2021-12-29 04:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('housemates', '0002_alter_invite_invite_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recurringbill',
            name='invites',
        ),
        migrations.AddField(
            model_name='invite',
            name='recurring_bill',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invites', to='housemates.recurringbill'),
        ),
    ]
