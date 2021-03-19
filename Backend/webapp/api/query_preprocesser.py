import os
import json
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer 
from nltk.tokenize import word_tokenize 
from .spell_checker import correction
import string

def preprocess_text(text):
    ps = PorterStemmer() 
    tokens = nltk.word_tokenize(text)
    stop_words = [word for word in stopwords.words('english') if word not in ['at', 'or', 'because', 'as', 'until', 'while', 'for', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'once', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]]

    filtered_sentence = [w for w in tokens if not w in stop_words]

    for idx, val in enumerate(filtered_sentence):
        filtered_sentence[idx] = correction(val)
        filtered_sentence[idx] = ps.stem(val)

    tmp = ' '.join(e for e in filtered_sentence if e.isalnum())
    filtered_query = tmp.translate(str.maketrans('', '', string.punctuation))

    return filtered_query