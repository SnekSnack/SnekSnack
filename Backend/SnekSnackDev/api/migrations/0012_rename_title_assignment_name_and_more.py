# Generated by Django 5.0.6 on 2024-10-03 05:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_assignment_persona_alter_assignment_due_date_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='assignment',
            old_name='title',
            new_name='name',
        ),
        migrations.AlterField(
            model_name='assignment',
            name='due_date',
            field=models.DateField(default=datetime.datetime(2024, 10, 3, 15, 49, 44, 872445)),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='release_date',
            field=models.DateField(default=datetime.datetime(2024, 10, 3, 15, 49, 44, 872445)),
        ),
    ]
