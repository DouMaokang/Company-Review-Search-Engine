# NTU-CZ4034
This repo contains the group project/assignment of CZ4034 - Information Retrieval

# Application Setup
### Backend
Under `./Backend`, type in the command prompt
```
python3 -m venv env
```
Then, type the below command to activate virtual env
```
source env/bin/activate
```
Install Python dependencies
```
pip install -r requirements.txt
```

### Frontend
Under `./UI/search-engine-react`, type in the command prompt
```
npm install
```

### ElasticSearch
Install ElasticSearch from `https://www.elastic.co/downloads/elasticsearch` and follow the installation steps at the bottom of the page

Install elasticsearch python client by following `https://elasticsearch-py.readthedocs.io/en/v7.12.0/` 
`python -m pip install elasticsearch`

Next, we are going to create an index "indeed" and index some documents

Under `./indexing`, run `python3 indexing.py` (command may vary based on your OS)

Then the script will start indexing documents. It takes about 15mins - 30mins.

When you see the text `done done done!` that means indexing has finished. You may checked the total number of indexed documents by calling the API `http://localhost:9200/indeed/_stats` in Postman

# Run the application
### Backend
Run the below command in `./Backend/webapp`
```
python manage.py runserver
```

### Frontend
Run the below command in `./UI/search-engine-react`
```
npm start
```
After that, pen `http://localhost:3000/` to check the application

# Calling the API
In Postman, set request to `POST http://localhost:8000/preprocess/`
For Body, choose `raw` and `JSON`\
Sample Body:
```
{
    "string": "I really enjoy the hiring process. It seems easy. However, if you are an international individual and English is not your first language, then \"GOOD LUCK!!\" If you have an accent, \"GOOD LUCK!\" Everything was good but I always felt out of place because dictating in English was very hard especially when Dragon(software they use for dictation) didn't really pick up how I speak in English with my pronounciation. I'm glad I made friends there and the mentors were cool and chill. At the same time, the atmosphere is weird like nobody talks to another even during break. Soo if you like your own space and love practicing social distance at its maximum level, then this job is for you! Give it a try but don't quit your other job unless you can handle the verbatim lifestyle"
}
```
Click Send to see the response
