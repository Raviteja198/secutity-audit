#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -f .env ]; then
  export "$(grep -E '^DATABASE_URL=' .env | xargs)"
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL not set (check .env)" >&2
  exit 1
fi

mkdir -p backups
timestamp=$(date +%Y%m%d_%H%M%S)
dump_file="backups/db_${timestamp}.dump"
zip_file="backups/db_${timestamp}.zip"

PG_DUMP=pg_dump
if [ -x /opt/homebrew/opt/postgresql@17/bin/pg_dump ]; then
  PG_DUMP=/opt/homebrew/opt/postgresql@17/bin/pg_dump
fi

echo "Dumping database..."
"$PG_DUMP" "$DATABASE_URL" -Fc -f "$dump_file"

echo "Zipping dump..."
zip -j "$zip_file" "$dump_file"
rm "$dump_file"

echo "Backup created: $zip_file"
