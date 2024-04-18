all:
	docker-compose up --build

stop:
	docker-compose stop

down:
	docker-compose down

backend:
	docker-compose exec backend bash
