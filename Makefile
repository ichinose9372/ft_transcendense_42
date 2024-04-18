all:
	docker-compose up --build

stop:
	docker-compose stop

down:
	docker-compose down

frontend:
	docker-compose exec frontend bash

backend:
	docker-compose exec backend bash
