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

.PHONY: all stop start down backend env ps
