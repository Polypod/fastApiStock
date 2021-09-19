FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

LABEL maintainer="Henrik E <unulotrichous@gmail.com>"

COPY requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r /requirements.txt

COPY ./app /app
