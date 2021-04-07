import os
import json
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer 
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.stem import WordNetLemmatizer
from spell_checker import correction
import string

def preprocess_text(text):
    tokens = word_tokenize(text)
    spelling_corrected_tokens = correct_spelling(tokens)
    tokens_without_stopwords = remove_stopwords(spelling_corrected_tokens)
    processed_tokens = stem(tokens_without_stopwords)
    result = remove_punctuation(processed_tokens)
    return result

def correct_spelling(tokens):
    for idx, val in enumerate(tokens):
        tokens[idx] = correction(val)
    return tokens

def penn2morphy(penntag):
    """ Converts Penn Treebank tags to WordNet. """
    morphy_tag = {'NN':'n', 'JJ':'a',
                  'VB':'v', 'RB':'r'}
    try:
        return morphy_tag[penntag[:2]]
    except:
        return 'n' 

def lemmatize(tokens):
    wnl = WordNetLemmatizer()
    return [wnl.lemmatize(word.lower(), pos=penn2morphy(tag)) 
            for word, tag in pos_tag(tokens)]

def remove_stopwords(tokens):
    stop_words = [word for word in stopwords.words('english') if word not in ['because', 'as', 'until', 'while', 'for', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'once', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]]
    result = [w for w in tokens if not w in stop_words]
    return result

def stem(tokens):
    ps = PorterStemmer() 

    for idx, val in enumerate(tokens):
        tokens[idx] = ps.stem(tokens[idx])
    return tokens

def remove_punctuation(tokens):
    # tokens = remove_stopwords(tokens)
    tmp = ' '.join(e for e in tokens if e.isalnum())
    result = tmp.translate(str.maketrans('', '', string.punctuation))

    return result

if __name__ == "__main__":
    preprocess_text("hehe")
