# Generated by Django 5.0.6 on 2024-08-26 12:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_assingment_authors'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Assingment',
            new_name='Assignment',
        ),
    ]
