# NTU-CZ4034
This repo contains the group project/assignment of CZ4034 - Information Retrieval

# Things to be installed
1. Elasticsearch
2. Node.js
3. Python 3.9.1

# Application Setup
### Node.js v15.11.0
install via `https://nodejs.org/en/download/`

### Virtual Environment
In the root folder `./NTU-CZ4034`, create and activate a virtual environment
```
python3 -m venv env
```
Then, type the below command to activate virtual env\
For Mac/Linux
```
source env/bin/activate
```
Install Python dependencies
```
pip install -r requirements.txt
```
All operations below needs to be done in this virtual environment

### Backend
No action needs to be taken


### Frontend
Under `./UI/template`, type in the command prompt
```
npm install --force
```

### Elasticsearch
1. Install and Run Elasticsearch\
From `https://www.elastic.co/downloads/elasticsearch` and follow the installation and run steps at the bottom of the page

2. Indexing\
Next, we are going to create an index "indeed" and index some documents.\
\
Under `./indexing`, run `python3 indexing.py` (command may vary based on OS).\
\
The script will start indexing documents before Aug 9 2020. The whole process takes about 15mins - 30mins.\
\
When you see the text `done done done!` in the comman prompt, the indexing is done!\
\
You may check the total number of indexed documents by calling the API `http://localhost:9200/indeed/_stats` in Postman (Before calling the API, ensure that Elasticsearch server is up and running on your machine)

# Run the application

Elasticserach, backend and frontend must be all up and running to make the application work

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
