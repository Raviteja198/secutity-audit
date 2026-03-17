
# Money Management (Rotating Savings + Charity + Loans)

Production-ready Next.js (App Router) application for managing a transparent, auditable rotating savings group ledger with charity and internal loans.

## Tech stack

- **Frontend**: Next.js App Router, React, Tailwind CSS
- **Backend**: Next.js Route Handlers (API), services layer
- **DB**: PostgreSQL + Prisma ORM
- **Auth**: Auth.js / NextAuth (email + password)

## Local setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy `.env.example` to `.env` and fill values (or edit the provided `.env`).

Required:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### 3) Database + Prisma
create a database 

```bash

docker run --name youth-db \
  -e POSTGRES_PASSWORD=ChangeMe123! \
  -e POSTGRES_DB=youth_management \
  -p 5432:5432 \
  -d postgres:16

```

```bash

DATABASE_URL="postgresql://postgres:ChangeMe123!@localhost:5432/youth_management?schema=public"

```



Create a PostgreSQL database, then run:

```bash
npm run prisma:migrate
npm run prisma:generate
npm run seed
```

Seed creates an **admin** user (customize via env):
- `SEED_ADMIN_EMAIL` (default `admin@example.com`)
- `SEED_ADMIN_PASSWORD` (default `ChangeMe123!`)

### 4) Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project structure (high level)

- `prisma/schema.prisma`: normalized database schema (versioned rules, immutable audit logs)
- `prisma/seed.ts`: seed admin + initial rules/settings
- `src/lib/*`: Prisma client, auth, middleware helpers, validation, audit logging
- `src/services/*`: business logic (rule selection, payment generation/recording, receipts, loans)
- `src/app/api/*`: API route handlers (admin audited writes + user read-only)
- `src/app/admin/*`: admin UI pages (CRUD + exports + audit view)
- `src/app/user/*`: read-only UI pages

## Deployment (Vercel / Netlify)

### Database (free-tier friendly)

Use any managed Postgres that supports free tiers, e.g. Neon / Supabase / Render Postgres. Create a DB and copy the connection string into `DATABASE_URL`.

### Vercel Deployment Guide

**Step 1: Add Environment Variables**

Go to **Vercel Dashboard → Settings → Environment Variables** and add:

- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 33`
- `NEXTAUTH_URL` - Your production domain (e.g., `https://app.vercel.app`)

**Important:** Ensure all vars have **Production** and **Preview** scopes checked ✅

**Step 2: Automatic Build Flow**

When you push to main, Vercel automatically runs:

```
1. npm ci                          (install dependencies)
   ↓ (postinstall hook)
2. prisma generate               (generate Prisma client)
   ↓ (buildCommand)
3. npm run prisma:migrate        (apply pending migrations)
4. npm run build                 (build Next.js)
   ↓
5. npm start                     (run on Vercel serverless)
```

**Step 3: Manual Data Seeding**

Prisma migrations run automatically, but seeding must be done manually:

**Option A: Seed via CLI (one-time)**
```bash
# Run against production database
npx prisma db seed --skip-generate
```

**Option B: Add to package.json postbuild hook** (if you want auto-seed)
```json
{
  "scripts": {
    "postbuild": "node prisma/seed.ts"
  }
}
```

**Option C: Use Vercel Function** (recommended for production)
Create `api/admin/seed.ts` with authentication check, then call it manually.

### Netlify

Same env vars as above. Ensure you use a Node runtime compatible with Next.js.

## Notes on transparency & auditability

- **Versioned rules**: contributions and penalties are versioned by effective date; payments store their own `baseAmountPaise` and `penaltyAmountPaise` permanently.
- **Audit logs**: every admin write action records `oldValue` and `newValue` JSON along with timestamp and IP headers.


# youth-managment
>>>>>>> 89a6c71473aa95ab209b846b8c45c540add56e4f
