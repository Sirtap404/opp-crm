#!/usr/bin/env bash
set -e
npm install
# Kör migrationer mot Neon
npx prisma migrate deploy
# Generera Prisma Client mot DB-schemat
npx prisma generate
# Bygg Next.js (PORT injiceras av Render)
npm run build
