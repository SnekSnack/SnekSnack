# Generated by Django 5.0.6 on 2024-09-23 07:39

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_personas_delete_chatbot_alter_assignment_due_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='persona',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.personas'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='assignment',
            name='due_date',
            field=models.DateField(default=datetime.datetime(2024, 9, 23, 17, 39, 12, 674434)),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='release_date',
            field=models.DateField(default=datetime.datetime(2024, 9, 23, 17, 39, 12, 674434)),
        ),
    ]