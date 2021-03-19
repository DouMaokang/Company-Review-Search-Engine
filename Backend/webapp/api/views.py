from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import StringSerializer
from .query_preprocesser import preprocess_text

@api_view(['POST'])
def preprocess(request):
    if request.method == 'POST':
        serializer = StringSerializer(data=request.data)
        if serializer.is_valid():
            result = preprocess_text(request.data['string'])
            return Response(result, status=status.HTTP_200_OK)
