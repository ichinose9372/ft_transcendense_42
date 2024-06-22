# Use the official Python 3 base image
FROM python:3.10.5

RUN apt-get update && apt-get install -y postgresql-client gettext

WORKDIR /app

COPY ./src/backend/requirements.txt /app/backend/requirements.txt

RUN pip install --upgrade pip && \
    pip install -r /app/backend/requirements.txt

RUN apt-get install -y openssl nginx
RUN mkdir -p /etc/nginx/ssl
RUN openssl req \
    -x509 \
    -nodes \
    -days 365 \
    -newkey rsa:2048 \
    -subj "/C=JP" \
    -keyout /etc/nginx/ssl/nginx.key \
    -out /etc/nginx/ssl/nginx.crt

COPY ./src/backend/default.conf /etc/nginx/nginx.conf

COPY ./src/backend/entrypoint.sh /app/backend/entrypoint.sh
RUN chmod +x /app/backend/entrypoint.sh

ENTRYPOINT [ "/app/backend/entrypoint.sh" ]

# WORKDIR /app/backend
# CMD [ "gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application" ]
# CMD [ "gunicorn", "--bind", "0.0.0.0:443", "--certfile=/etc/ssl/server.key", "--keyfile=/etc/ssl/server.key", "server.wsgi:application" ]
