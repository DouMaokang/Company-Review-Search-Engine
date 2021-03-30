from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import requests, json
from .serializers import StringSerializer
from .text_preprocesser import preprocess_text
from .word_cloud_gen import generate_wordcloud
from .spell_checker import correction

@api_view(['POST'])
def preprocess(request):
    if request.method == 'POST':
        serializer = StringSerializer(data=request.data)
        if serializer.is_valid():
            result = preprocess_text(request.data['string'])
            return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def wordcloud(request):
    if request.method == 'GET':
        company = request.query_params['company']
        wordcloud_json = generate_wordcloud(company)

    return Response(wordcloud_json, status=status.HTTP_200_OK)

@api_view(['GET'])
def search(request):
    if request.method == 'GET':
        processed_query = preprocess_text(request.query_params['query'])
        body='{{"query": {{"match": {{"token": {{"query": "{content}"}}}}}}}}'.format(content=processed_query)
        # body = '{"query": {"match": {"token":  {"query": "work"}}}}'

        response = requests.request(method='get', url='http://localhost:9200/indeed/_search/', headers={"content-type":"application/json"}, data=body)
    return Response(response.json(), status=status.HTTP_200_OK)
