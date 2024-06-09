#!/bin/bash

set -e

echo "PostgreSQL started"

echo "Applying database migrations..."
python3 /app/backend/manage.py migrate --noinput

echo "Translation Setup..."
python3 /app/backend/manage.py compilemessages


echo "Starting Django server..."
python3 /app/backend/manage.py runserver 0.0.0.0:8000 --insecure
