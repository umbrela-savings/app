# Generated by Django 2.2.3 on 2019-07-17 04:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20190717_0329'),
    ]

    operations = [
        migrations.AddField(
            model_name='circle',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='circle',
            name='start_date',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='circleuser',
            name='circle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='membership', to='accounts.Circle'),
        ),
        migrations.AlterField(
            model_name='circleuser',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='membership', to=settings.AUTH_USER_MODEL),
        ),
    ]
