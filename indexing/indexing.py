import os
import json
from elasticsearch import Elasticsearch
import nltk
from nltk.corpus import stopwords
import requests
import re
from collections import Counter
from text_preprocesser import preprocess_text
import pandas as pd
import itertools
import datetime
import time

def main():
    stop_words = [word for word in stopwords.words('english') if word not in ['because', 'as', 'until', 'while', 'for', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'once', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]]

    es = Elasticsearch(host="localhost", port=9200)
    es = Elasticsearch()

    request_body = {
        "settings": {
            "index": {
                "analysis": {
                    "analyzer":{  
                        "default":{  
                            "tokenizer":"whitespace",
                            "filter":[  
                                "synonym",
                                "lowercase"
                            ]
                        }
                    },
                    "filter": {
                        "synonym": {
                            "type": "synonym",
                            "synonyms": [
                                "co worker, co work, coworker, cowork, colleagu, colleague",
                                "color, colour"
                            ]
                        }
                    }
                }
            }
        }
    }

    es.indices.create(index = 'indeed', body = request_body)
    
    df = pd.read_csv('metadata_with_sentiment.csv')

    for index, row in df.iterrows():
        tmp_date = pd.to_datetime(row['date'][1:]).date()
        history_date = pd.to_datetime("August 9, 2020").date()
        if tmp_date <= history_date: 
            processed_text = preprocess_text(row['review'])

            review_json = {}
            review_json["review_raw"] = row['review']
            review_json["category"] = row['category']
            review_json["id"] = row['id']
            review_json["review_tokens"] = processed_text
            review_json["company"] = row['URL'].split('/')[-2]
            review_json["post_date"] = tmp_date
            review_json["location"] = row['place'][1:]
            review_json["job_title"] = row['job']
            review_json["sentiment"] = row['sentiment']

            es.index(index='indeed', id=row['id'], body=review_json)

            print(row['id'])
    
    print('done done done!')

if __name__ == "__main__":
    main()
