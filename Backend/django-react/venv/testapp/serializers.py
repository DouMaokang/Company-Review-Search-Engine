from rest_framework import serializers
from .models import test

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = test
        fields = ('id', 'company_name', 'location', 'created_at')