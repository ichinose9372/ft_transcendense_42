all:
	docker-compose up --build

stop:
	docker-compose down

frontend:
	docker-compose exec frontend bash

