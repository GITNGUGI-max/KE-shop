# Generated by Django 4.1.7 on 2023-03-25 03:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_postalcoode_shippingaddress_postalcode'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingaddress',
            name='shippingPrice',
        ),
    ]