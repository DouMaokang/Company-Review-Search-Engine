# NTU-CZ4034
This repo contains the group project/assignment of CZ4034 - Information Retrieval

# Backend Setup
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
pip install requirements.txt
```

# Run the application
Run the below command in `./Backend/webapp
```
python manage.py runserver
```

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
