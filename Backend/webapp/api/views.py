from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import StringSerializer
from .text_preprocesser import preprocess_text
from .word_cloud_gen import generate_wordcloud

@api_view(['POST'])
def preprocess(request):
    if request.method == 'POST':
        serializer = StringSerializer(data=request.data)
        if serializer.is_valid():
            result = preprocess_text(request.data['string'])
            return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def wordcloud(request):
    print("123")
    if request.method == 'GET':
        company = request.query_params['company']
        wordcloud_json = generate_wordcloud(company)
        print({'words': wordcloud_json})

    return Response(wordcloud_json, status=status.HTTP_200_OK)
