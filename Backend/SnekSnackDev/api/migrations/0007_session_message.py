# Generated by Django 5.0.6 on 2024-08-30 13:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_authors_assignment_bots'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.assignment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('author', models.CharField(max_length=100)),
                ('sent_at', models.DateTimeField()),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.session')),
            ],
        ),
    ]
