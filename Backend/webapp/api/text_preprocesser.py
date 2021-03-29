import os
import json
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer 
from nltk.tokenize import word_tokenize 
from .spell_checker import correction
import string

def preprocess_text(text):
    tokens = nltk.word_tokenize(text)
    
    tokens_without_stopwords = remove_stopwords(tokens)
    processed_tokens = correct_spelling_and_stemming(tokens_without_stopwords)
    result = remove_punctuation(processed_tokens)

    return result

def remove_stopwords(tokens):
    stop_words = [word for word in stopwords.words('english') if word not in ['at', 'or', 'because', 'as', 'until', 'while', 'for', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'once', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]]
    result = [w for w in tokens if not w in stop_words]
    return result

def correct_spelling_and_stemming(tokens):
    ps = PorterStemmer() 

    for idx, val in enumerate(tokens):
        tokens[idx] = correction(val)
        tokens[idx] = ps.stem(val)

    return tokens

def remove_punctuation(tokens):
    tmp = ' '.join(e for e in tokens if e.isalnum())
    result = tmp.translate(str.maketrans('', '', string.punctuation))

    return result
