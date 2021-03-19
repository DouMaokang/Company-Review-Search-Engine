from django.db import models

class test(models.Model):
    # id = models.IntegerChoices()
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)