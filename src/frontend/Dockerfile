FROM node:16

RUN apt-get update && apt-get install -y \
	vim

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install && \
	npm install --save-dev jest

RUN sed -i 's/"test": "echo \\"Error: no test specified\\" && exit 1"/"test": "jest"/g' /app/package.json
