#!/bin/sh
set -e

until nc -z postgres 5432; do
  sleep 1
done

npx prisma migrate dev

exec yarn dev
