# Generated by Django 5.0.6 on 2024-09-19 05:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_session_assignment_remove_session_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='bots',
        ),
        migrations.AddField(
            model_name='assignment',
            name='description',
            field=models.TextField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='assignment',
            name='question_limit',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='assignment',
            name='release_date',
            field=models.DateField(default=datetime.datetime(2024, 9, 19, 15, 11, 36, 238868)),
        ),
        migrations.AddField(
            model_name='assignment',
            name='time_limit',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='due_date',
            field=models.DateField(default=datetime.datetime(2024, 9, 19, 15, 11, 36, 238868)),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='title',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
