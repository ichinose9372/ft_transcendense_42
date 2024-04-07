#!/bin/bash

set -e

python3 ./server/manage.py migrate --noinput

python3 ./server/manage.py runserver