.DEFAULT_GOAL := help

all:
	docker-compose up --build -d

stop:
	docker-compose down

back:
	@docker ps | grep trascen-backend > /dev/null || (echo "Backend container is not running."; exit 1)
	docker exec -it trascen-backend bash

db: 
	@docker ps | grep trascen-db > /dev/null || (echo "db container is not running."; exit 1)
	docker exec -it trascen-db psql -h db -p 5432 -U user42 -d transcendence_db


re:
	docker-compose down
	docker-compose up --build -d
p:
	docker ps

logs-%:
	docker-compose logs $*

logs:
	docker-compose logs

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
	@echo "  help     Show this help message"


.DEFAULT:
	@$(MAKE) help