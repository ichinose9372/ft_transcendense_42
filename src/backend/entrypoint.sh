#!/bin/bash

set -e

echo "Waiting for postgres..."
while ! pg_isready -h db -p 5432 -U user42; do
    sleep 1;
done

echo "PostgreSQL started"

echo "Applying database migrations..."
python3 /app/backend/manage.py migrate --noinput


echo "Starting Django server..."
python3 /app/backend/manage.py runserver 0.0.0.0:8000
