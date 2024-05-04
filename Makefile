all:
	docker-compose up --build

stop:
	docker-compose stop

start:
	docker-compose start

down:
	docker-compose down

backend:
	docker-compose exec backend bash

env:
	cp .env.example .env

ps:
	docker-compose ps

front-build:
	docker build -t frontend-test -f ./src/frontend/Dockerfile ./src/frontend

front-run:
	docker run -it --rm -p 3000:3000 -v ./src/frontend/:/app  --name frontend-test frontend-test bash

.PHONY: all stop start down backend env ps
