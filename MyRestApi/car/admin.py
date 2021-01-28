from django.contrib import admin
from car.models import UserProfile, Rent, CustomerDetail, CarType

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Rent)
admin.site.register(CustomerDetail)
admin.site.register(CarType)
