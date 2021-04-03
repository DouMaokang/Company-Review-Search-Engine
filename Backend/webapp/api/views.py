from django.shortcuts import render
import pandas as pd
import requests, json, os, datetime
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import Search
from elasticsearch.helpers import bulk
from elasticsearch import Elasticsearch
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
        body = {'size': 1000, 'query': {'match': {'review_tokens': processed_query}}}
        response = es.search(index="indeed", body=body)
    return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
def search_by_company(request):
    if request.method == 'GET':
        query = request.GET['query']
        company = request.query_params['company']
        if query is not None and query != '':
            processed_query = preprocess_text(request.query_params['query'])
            body = {'size': 1000, 'query': {'bool': {'must': [{"match": { "company": company}}, {"match": { "review_tokens": processed_query}}]}}}
        else:
            body = {'size': 1000, 'query': {'bool': {'must': [{"match": { "company": company}}, {"match_all": {}}]}}}
        response = es.search(index="indeed", body=body)
    return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
def request_latest_doc_date(request):
    if request.method == 'GET':
        body = {"size": 1, "sort": { "post_date": "desc"}, "query": {"match_all": {}}}
        response = es.search(index="indeed", body=body)
        latest_date = response['hits']['hits'][0]['_source']['post_date']
    return Response(response['hits']['hits'][0]['_source']['post_date'], status=status.HTTP_200_OK)

@api_view(['GET'])
def add_docs_in_next_day(request):
    if request.method == 'GET':
        from_date = request.query_params['from_date']
        CURRENT_FOLDER = os.path.dirname(os.path.abspath(__file__))
        meta_data_file = os.path.join(CURRENT_FOLDER, 'metadata_with_sentiment.csv')
        df = pd.read_csv(meta_data_file)
        count = 0
        for index, row in df.iterrows():
            csv_date = pd.to_datetime(row['date'][1:]).date()
            to_date = pd.to_datetime(from_date) + datetime.timedelta(days=5)
            from_date = pd.to_datetime(from_date).date()
            if csv_date <= to_date and csv_date > from_date:
                count = count + 1
                processed_text = preprocess_text(row['review'])

                review_json = {}
                review_json["review_raw"] = row['review']
                review_json["category"] = row['category']
                review_json["id"] = row['id']
                review_json["review_tokens"] = processed_text
                review_json["company"] = row['URL'].split('/')[-2]
                review_json["post_date"] = csv_date
                review_json["location"] = row['place'][1:]
                review_json["job_title"] = row['job']
                # review_json["timestamp"] = datetime.datetime.now()
                review_json["sentiment"] = row['sentiment']

                es.index(index='indeed', id=row['id'], body=review_json)
                print(row['id'])
        
    return Response(count, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_total_reviews(request):
    if request.method == 'GET':
        total_reviews = es.indices.stats(index="indeed")['_all']['primaries']['indexing']['index_total']
    return Response(total_reviews, status=status.HTTP_200_OK)