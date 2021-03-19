from django.shortcuts import render

from .models import test
from .serializers import TestSerializer
from rest_framework import generics

class TestListCreate(generics.ListCreateAPIView):
    queryset = test.objects.all()
    serializer_class = TestSerializer