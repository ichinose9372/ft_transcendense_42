# Use the official Python 3 base image
FROM python:3.10.5

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the local directory into the container
COPY . /app

# Install the required dependencies
RUN pip install --upgrade pip && \
    pip install -r initialize/requirements.txt

# change parmissions of the entrypoint script
RUN chmod +x /app/initialize/entrypoint.sh

ENTRYPOINT [ "/app/initialize/entrypoint.sh" ]

