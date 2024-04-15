all:
	docker compose up --build

stop:
	docker compose down

test:
	docker exec ft_transcendense_42-backend-1 python3 manage.py test

