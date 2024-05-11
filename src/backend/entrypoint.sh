#!/bin/bash

set -e

echo "PostgreSQL started"

echo "Applying database migrations..."
python3 /app/backend/manage.py migrate --noinput


echo "Starting Django server..."
python3 /app/backend/manage.py runserver 0.0.0.0:8000
