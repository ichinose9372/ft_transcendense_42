.DEFAULT_GOAL := all

all:
	docker-compose up --build -d

stop:
	docker-compose stop

start:
	docker-compose start

down:
	docker-compose down

back:
	@docker ps | grep trascen-backend-1 > /dev/null || (echo "Backend container is not running.")
	docker-compose exec backend bash
	# If you want to exit the container, use the 'exit' command.

db:
	@docker ps | grep trascen-db-1 > /dev/null || (echo "db container is not running."; exit 1)
	docker-compose exec db psql -h db -p 5432 -U user42 -d transcendence_db
	# If you want to exit the container, use the '\q' command.

test:
	@docker ps | grep trascen-backend-1 > /dev/null || (echo "Backend container is not running.")
	docker-compose exec backend python backend/manage.py test models
re:
	docker-compose down
	docker-compose up --build -d
p:
	docker ps

logs-%:
	docker-compose logs $*

logs:
	docker-compose logs

front-build:
	docker build -t frontend-test -f ./src/frontend/Dockerfile ./src/frontend

front-run:
	docker run -it --rm -p 3000:3000 -v ./src/frontend/:/app  --name frontend-test frontend-test bash


help:
	@echo "Usage:"
	@echo "  make [command]"
	@echo "  Commands:"
	@echo "  all      Start the application containers"
	@echo "  stop     Stop the application containers"
	@echo "  back     exec backend container"
	@echo "  db       exec db container and login to psql"
	@echo "  re       Restart the application containers"
	@echo "  p        Show running containers"
	@echo "  logs     Show logs of all containers"
	@echo "  logs-<container> Show logs of a specific container"
	@echo "  front-build Build the frontend container"
	@echo "  front-run Run the frontend container"
	@echo "  help     Show this help message"
