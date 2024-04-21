# Use the official Python 3 base image
FROM python:3.10.5

# Set psql command 
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the local directory into the container
COPY . /app

# Install the required dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# change parmissions of the entrypoint script
RUN chmod +x entrypoint.sh

RUN ls -al

RUN pwd

ENTRYPOINT [ "/app/entrypoint.sh" ]

