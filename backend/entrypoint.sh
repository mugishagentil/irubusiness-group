#!/bin/sh

set -e
echo "⏳ Waiting for database at iru-db:5432..."
until nc -z iru-db 5432; do
  sleep 2
done

echo "Database is up, running migrations and seeding..."

# Run Prisma migrations
npx prisma migrate deploy


echo "Starting backend..."
exec node dist/src/server.js