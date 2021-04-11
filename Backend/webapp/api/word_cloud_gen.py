import os
from wordcloud import WordCloud, STOPWORDS
import pandas as pd
import nltk
from nltk.corpus import stopwords

def generate_wordcloud(company):
    CURRENT_FOLDER = os.path.dirname(os.path.abspath(__file__))
    meta_data_file = os.path.join(CURRENT_FOLDER, 'metadata_with_sentiment.csv')
    df = pd.read_csv(meta_data_file, encoding ="utf8")

    comment_words = ''
    stop_words = [word for word in stopwords.words('english')]
    df['company'] = df.apply(lambda row: row.URL.split('/')[-2], axis=1)

    for i, row in df.iterrows():
        if row['company'].lower() == company.lower():
            val = str(row['review'])
            tokens = val.split()
            for i in range(len(tokens)):
                tokens[i] = tokens[i].lower()

            comment_words += " ".join(tokens)+" "

    wordcloud = WordCloud(width = 800, height = 800,
        background_color ='white',
        stopwords = stop_words,
        min_font_size = 10).generate(comment_words)

    result = []

    for k, v in wordcloud.words_.items():
        result.append({'text': k, 'value': v})

    return result
