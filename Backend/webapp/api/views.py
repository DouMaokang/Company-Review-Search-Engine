from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import Search
from elasticsearch.helpers import bulk
from elasticsearch import Elasticsearch
import requests, json
from .serializers import StringSerializer
from .text_preprocesser import preprocess_text
from .word_cloud_gen import generate_wordcloud
from .spell_checker import correction

es = Elasticsearch(host="localhost", port=9200)

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
        body = {'size': 1000, 'query': {'match': {'tokens': processed_query}}}
        response = es.search(index="indeed", body=body)
    return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
def search_by_company(request):
    if request.method == 'GET':
        company = request.query_params['company']
        if 'query' in request.GET:
            processed_query = preprocess_text(request.query_params['query'])
            body = {'size': 1000, 'query': {'bool': {'must': [{"match": { "company": company}}, {"match": { "tokens": processed_query}}]}}}
        else:
            body = {'size': 1000, 'query': {'bool': {'must': [{"match": { "company": company}}, {"match_all": {}}]}}}
        response = es.search(index="indeed", body=body)
    return Response(response, status=status.HTTP_200_OK)
