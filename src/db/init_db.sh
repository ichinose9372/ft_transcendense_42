#!/bin/bash
set -e

until [ -d "/var/lib/postgresql/data" ]; do
  sleep 1
done

sed -i '$ d' /var/lib/postgresql/data/pg_hba.conf

echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf

# psql -v ON_ERROR_STOP=1 postgres <<EOSQL
# 	CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
# 	CREATE DATABASE $POSTGRES_DB WITH OWNER $POSTGRES_USER;
# 	GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
# EOSQL
