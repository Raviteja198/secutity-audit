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

### Vercel

- Add env vars: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Deploy
- Run migrations:
  - Either from your CI/CD pipeline, or locally against production DB:

```bash
npx prisma migrate deploy
```

### Netlify

Same env vars as above. Ensure you use a Node runtime compatible with Next.js.

## Notes on transparency & auditability

- **Versioned rules**: contributions and penalties are versioned by effective date; payments store their own `baseAmountPaise` and `penaltyAmountPaise` permanently.
- **Audit logs**: every admin write action records `oldValue` and `newValue` JSON along with timestamp and IP headers.

