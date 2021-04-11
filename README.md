# NTU-CZ4034
This repo contains the group project/assignment of CZ4034 - Information Retrieval

# Things to be installed
1. Elasticsearch
2. Node.js
3. Python3

# Application Setup
### Virtual Environment
In the root folder ./NTU-CZ4034, create and activate an virtual environment
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

### Backend
Under `./Backend`, type in the command prompt


### Frontend
Under `./UI/template`, type in the command prompt
```
npm install --force
```

### Elasticsearch
Install Elasticsearch from `https://www.elastic.co/downloads/elasticsearch` and follow the installation steps at the bottom of the page

Under `./indexing`, install elasticsearch python client by following `https://elasticsearch-py.readthedocs.io/en/v7.12.0/` 
```
python -m pip install elasticsearch
```

Next, we are going to create an index "indeed" and index some documents

Under `./indexing`, run `python3 indexing.py` (command may vary based on your OS)

The script will start indexing documents. It takes about 15mins - 30mins.

When you see the text `done done done!` that means indexing has finished. 

You may checked the total number of indexed documents by calling the API `http://localhost:9200/indeed/_stats` in Postman (Before calling the API, ensure that Elasticsearch server is up and running on your machine)

# Run the application
### Elasticsearch
Mac/Linux
```
bin/elasticsearch
```

Windows
```
bin\elasticsearch.bat
```

### Backend
Run the below command in `./Backend/webapp`
```
python manage.py runserver
```

### Frontend
Run the below command in `./UI/template`
```
npm start
```
After that, open `http://localhost:3000/` to check the application
