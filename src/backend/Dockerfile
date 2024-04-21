# Use the official Python 3 base image
FROM python:3.10.5

# Set psql command
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the local directory into the container
COPY ./src/backend/requirements.txt /app/backend/requirements.txt
COPY ./src/backend/entrypoint.sh /app/backend/entrypoint.sh
# Install the required dependencies
RUN pip install --upgrade pip && \
    pip install -r /app/backend/requirements.txt

# change parmissions of the entrypoint script
RUN chmod +x /app/backend/entrypoint.sh

ENTRYPOINT [ "/app/backend/entrypoint.sh" ]
