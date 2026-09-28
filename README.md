# Youth Managment

A production-grade, **multi-tenant** web application for community youth and savings associations — each group gets its own isolated workspace to manage members, monthly savings contributions, loans, charity records, and fund tracking, replacing the paper ledger and spreadsheets these groups traditionally use.

**Live app:** https://www.youthmanagment.com

**Security:** OWASP-oriented threat model, test checklist, remediation notes, and security ownership now live in this repository under [`docs/security/`](docs/security/README.md). The application and its security assessment are maintained together.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Prisma Postgres) |
| ORM | Prisma 6 |
| Auth | NextAuth v4 (JWT + Credentials + Google OAuth) |
| Deployment | Vercel |
| Email delivery | Custom SMTP sender over Node sockets/TLS |
| WhatsApp delivery | Meta WhatsApp Cloud API |
| File storage | Cloudinary (tenant logos) |

---



## Implemented Features

- **Multi-tenancy with row-level isolation** — every table carries a `tenantId`; each association's members, payments, loans, and settings are fully separated. Tenants can set their own organization name and logo (stored on Cloudinary).
- **Tenant onboarding** — an OTP-gated `/system/onboard-tenant` page (restricted to the operator email via `ONBOARDING_ALLOWED_EMAIL`) creates new tenants; onboarded admins set their own password via email. Prospective groups can also request access through the marketing homepage form.
- **Marketing homepage** with an animated group-ledger visualization, FAQ (with `FAQPage` JSON-LD), and SEO setup: `robots.ts`, `sitemap.ts`, `manifest.ts`, canonical/Open Graph/Twitter metadata, and Organization/WebSite structured data.
- Admin and user portals with role-based access control; sign in with email/password or Google.
- Member management with create, edit, deactivate/reactivate, bulk import, and login OTP generation/reset.
- Monthly payment generation, payment recording, late penalties, receipt PDFs, and receipt email delivery.
- **Payment reminders before due dates** — email + WhatsApp, with editable reminder templates and per-schedule scheduled reminders (day/hour/minute/timezone) so members avoid late penalties.
- **Self-service password reset** — members use a forgot-password OTP flow by email instead of asking an admin.
- Loan lifecycle management including approval, repayment tracking, closing, overdue monitoring, and delete confirmation by emailed verification code.
- Charity tracking, fund ledger tracking, dashboards (with caching), audit logs, and admin Excel export.
- User read-only views for dashboard, payments, loans, charity, members, rules, and reports.
- Terms & conditions acceptance tracking per user and version.
- **Test mode** (`TEST_MODE=true`) redirects every outgoing email to `TEST_MODE_EMAIL` — recommended for all non-production environments so real members never receive test mail.

---

## Project Structure

```
prisma/
  schema.prisma          — Database schema (single source of truth, incl. Tenant model)
  migrations/            — SQL migration history (incl. multi-tenant row-level isolation)
  seed.ts                — Creates admin user + default settings
scripts/
  wipe-data.ts           — Deletes transactional data (keeps Members + Users)
src/
  app/
    page.tsx             — Marketing homepage (landing page for anonymous visitors)
    robots.ts            — robots.txt (App Router convention)
    sitemap.ts           — sitemap.xml
    manifest.ts          — Web app manifest
    admin/               — Admin pages (dashboard, members, payments, loans, etc.)
    user/                — Member read-only pages
    system/onboard-tenant/ — OTP-gated tenant creation page (operator only)
    api/admin/           — Admin API routes
    api/user/            — User API routes
    api/auth/            — NextAuth + forgot/reset password OTP routes
    api/cron/            — Cron-triggered routes (payment reminders)
    login/               — Login page
    forgot-password/     — Self-service password reset (OTP by email)
  components/
    marketing/           — Landing page, ledger visualization, onboarding form
    seo/                 — JSON-LD structured data helpers
    ...                  — Shared UI components
  services/
    email.ts             — SMTP email sender (attachments supported)
    notifications.ts     — Email + WhatsApp reminder orchestration
    whatsapp.ts          — Meta WhatsApp Cloud API sender
    payments.ts          — Payment recording + receipt email
    cloudinary.ts        — Tenant logo uploads
  lib/
    auth.ts              — NextAuth configuration (credentials + Google)
    prisma.ts            — Prisma client singleton
    tenantPrisma.ts      — Tenant-scoped Prisma helpers (row-level isolation)
    scheduledReminders.ts — Scheduled reminder engine
    cronScheduler.ts     — In-process cron fallback for non-Vercel hosts
    systemOnboardingOtp.ts — OTP flow for tenant onboarding
    api/authz.ts         — requireAdmin / requireAuth helpers
    validators/          — Zod schemas + client-side validators
```

---

## Local Development Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (for local DB) OR use the shared dev cloud DB directly

---

### Option A — Use the Dev Cloud Database (Easiest)

The dev database is already set up on Prisma Postgres. No local PostgreSQL needed.

**1. Clone the repo**
```bash
git clone <repo-url>
cd youth-managment
```

**2. Install dependencies**
```bash
npm install
```

**3. Create your `.env` file**

Copy the example and fill in the values — `.env.example` is the canonical, up-to-date list of every variable the app reads:
```bash
cp .env.example .env
```

Then edit `.env` and set the `DATABASE_URL` to the dev cloud URL:
```
DATABASE_URL=postgres://TOKEN@db.prisma.io:5432/postgres?sslmode=require
NEXTAUTH_SECRET="any-long-random-string-for-local"
NEXTAUTH_URL="http://localhost:3000"
SEED_ADMIN_EMAIL="your-admin@email.com"
SEED_ADMIN_PASSWORD="YourStrongPassword@123"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-smtp-user@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="People's Youth <your-smtp-user@gmail.com>"
EMAIL_HELO_HOST="localhost"
WHATSAPP_ACCESS_TOKEN="your-meta-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-whatsapp-phone-number-id"
WHATSAPP_API_VERSION="v19.0"
WHATSAPP_LANGUAGE_CODE="en_US"
WHATSAPP_DEFAULT_TEMPLATE="payment_reminder"
PAYMENT_REMINDER_PENALTY_TEXT="late fee penalties"
DEPLOYMENT_ENV="LOCAL"
```

> Ask the project owner for the `DATABASE_URL` token.

**4. Run migrations + seed**
```bash
npm run prisma:migrate   # applies any pending migrations
npm run seed             # creates admin user
```

**5. Start the dev server**
```bash
npm run dev
```

Visit http://localhost:3000

---

## Runtime Notes

- `npm run build` runs `prisma migrate deploy && next build`, so a valid `DATABASE_URL` is required even for local or CI builds.
- Several APIs are explicitly Node-only because they generate PDFs, export `.xlsx` files, or send email. They cannot run on the Edge runtime.
- Most admin and user pages require authentication. After setup, sign in with the seeded admin account before testing protected routes.

---

### Option B — Local PostgreSQL Database

**1. Install PostgreSQL**
```bash
# macOS (Homebrew)
brew install postgresql@16
brew services start postgresql@16

# Ubuntu / Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**2. Create the database**
```bash
# macOS — username is your macOS login name (e.g. "john")
createdb youth_management

# Linux / psql
sudo -u postgres psql
CREATE DATABASE youth_management;
\q
```

**3. Set up `.env`**
```
# macOS Homebrew (no password, username = your system username)
DATABASE_URL=postgresql://YOUR_MAC_USERNAME@localhost:5432/youth_management

# Linux with postgres user
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/youth_management

NEXTAUTH_SECRET="any-long-random-string-for-local"
NEXTAUTH_URL="http://localhost:3000"
SEED_ADMIN_EMAIL="admin@example.com"
SEED_ADMIN_PASSWORD="YourPassword@123"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-smtp-user@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="People's Youth <your-smtp-user@gmail.com>"
EMAIL_HELO_HOST="localhost"
WHATSAPP_ACCESS_TOKEN="your-meta-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-whatsapp-phone-number-id"
WHATSAPP_API_VERSION="v19.0"
WHATSAPP_LANGUAGE_CODE="en_US"
WHATSAPP_DEFAULT_TEMPLATE="payment_reminder"
PAYMENT_REMINDER_PENALTY_TEXT="late fee penalties"
DEPLOYMENT_ENV="LOCAL"
```

**4. Run migrations + seed**
```bash
npx prisma migrate deploy   # creates all tables
npm run seed                # creates admin user + default settings
```

**5. Start dev server**
```bash
npm run dev
```

---

## Connecting to the Dev Database

The dev cloud DB is shared for development testing. Use the `DATABASE_URL` provided by the project owner.

To verify your connection:
```bash
npx prisma migrate status
```

Expected output: `Database schema is up to date!`

---

## Database Migrations

### What are migrations?

Migrations are SQL files that describe how the database schema changes over time. They live in `prisma/migrations/`. Every schema change (new table, new column, etc.) must go through a migration.

### Creating a new migration (local dev)

After editing `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name describe_your_change
# Example: npx prisma migrate dev --name add_phone_to_member
```

This will:
1. Generate a SQL migration file in `prisma/migrations/`
2. Apply it to your local database
3. Regenerate the Prisma client

### Applying migrations (to any database)

```bash
npx prisma migrate deploy
```

This applies all unapplied migrations in order. **This is what runs automatically on Vercel during every deployment.**

### Checking migration status

```bash
npx prisma migrate status
```

### Resetting to a clean slate (local only — DESTROYS ALL DATA)

```bash
npx prisma migrate reset
npm run seed
```

---

## Seeding Data

The seed creates only the admin user and default app settings. It is **idempotent** (safe to run multiple times).

### Running the seed
```bash
npm run seed
```

### What it creates
- Admin user with credentials from `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`
- `receiptPrefix = RCP`
- `paymentDueDay = 10`

### Customising seed credentials

Set environment variables before running:
```bash
SEED_ADMIN_EMAIL="admin@yourdomain.com" \
SEED_ADMIN_PASSWORD="StrongPass@123" \
npm run seed
```

Or update them in your `.env` file.

---

## Wipe Transactional Data (Keep Members)

To clear all payments, loans, charity, rules, etc. but keep Member and User records:
```bash
npm run db:wipe
```

You'll be prompted for confirmation. Useful when starting fresh testing.

---

## Vercel Deployment

### Step 1 — Connect your repo to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel auto-detects Next.js

### Step 2 — Set environment variables in Vercel

Go to your Vercel project → **Settings → Environment Variables** and add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Prisma Postgres URL (same one used in dev) |
| `NEXTAUTH_SECRET` | A strong random string — run `openssl rand -hex 32` |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` |
| `SEED_ADMIN_EMAIL` | Admin email for production |
| `SEED_ADMIN_PASSWORD` | Admin password for production |
| `EMAIL_HOST` | SMTP host, e.g. `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port, usually `587` (STARTTLS) or `465` (implicit TLS) |
| `EMAIL_SECURE` | `false` for STARTTLS on `587`, `true` for implicit TLS on `465` |
| `EMAIL_USER` | SMTP username / sender login |
| `EMAIL_PASS` | SMTP password or app password |
| `EMAIL_FROM` | Optional From header, e.g. `"People's Youth" <noreply@example.com>` |
| `EMAIL_HELO_HOST` | Optional EHLO hostname override |
| `WHATSAPP_ACCESS_TOKEN` | Meta WhatsApp Cloud API access token |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp Cloud API phone number ID |
| `WHATSAPP_API_VERSION` | Optional Graph API version, defaults to `v19.0` |
| `WHATSAPP_LANGUAGE_CODE` | Optional template language code, defaults to `en_US` |
| `WHATSAPP_DEFAULT_TEMPLATE` | Default WhatsApp template name for reminders |
| `PAYMENT_REMINDER_PENALTY_TEXT` | Optional reminder copy for penalty wording |
| `DEPLOYMENT_ENV` | Optional environment flag: `LOCAL`, `DEV`, or `PROD` |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL (`https://www.youthmanagment.com`) — used by robots/sitemap/metadata/JSON-LD |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials for Sign in with Google |
| `CRON_SECRET` | Bearer token the cron trigger sends when invoking `/api/cron/*` |
| `ONBOARDING_ALLOWED_EMAIL` | The only email allowed to create tenants via `/system/onboard-tenant` |
| `CLOUDINARY_URL` | Cloudinary credentials for tenant logo uploads |
| `TEST_MODE` / `TEST_MODE_EMAIL` | When `TEST_MODE=true`, all outgoing email is redirected to `TEST_MODE_EMAIL` (keep ON outside production) |

> **Important:** `NEXTAUTH_URL` must match your exact Vercel deployment URL, including `https://`.

### Step 3 — Deploy

```bash
git push origin main
```

Vercel will automatically:
1. Run `prisma generate` (via `postinstall`)
2. Run `prisma migrate deploy` (applies all pending migrations)
3. Build the Next.js app

### Step 4 — Seed production database (first deploy only)

After your first Vercel deployment, run the seed once to create the admin user:

```bash
# Using Vercel CLI (install with: npm i -g vercel)
vercel env pull .env.production
DATABASE_URL=$(grep DATABASE_URL .env.production | cut -d'=' -f2-) \
SEED_ADMIN_EMAIL="admin@yourdomain.com" \
SEED_ADMIN_PASSWORD="YourStrongPassword@123" \
npx tsx prisma/seed.ts
```

Or run it locally using the production `DATABASE_URL`:
```bash
# Set DATABASE_URL to production URL temporarily
DATABASE_URL="your-prod-url" npm run seed
```

### Step 5 — Sign in

Visit your Vercel URL → sign in with your `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`.

---

## Adding a New Migration (Step-by-Step)

**Scenario:** You want to add a `notes` field to the `Member` table.

**1. Edit the schema**
```prisma
# prisma/schema.prisma
model Member {
  # ...existing fields...
  notes String?   # ← Add this line
}
```

**2. Create the migration (local dev)**
```bash
npx prisma migrate dev --name add_notes_to_member
```

**3. Verify**
```bash
npx prisma migrate status
# Should show: "Database schema is up to date!"
```

**4. Deploy**
```bash
git add prisma/
git commit -m "add notes field to Member"
git push origin main
```

Vercel will automatically run `prisma migrate deploy` during build, applying the migration to production.

---

## Member Login System (OTP)

Members can be given read-only access to view their payments, loan status, and charity records.

### How it works

1. **Admin adds a member** in the Members page.
2. **Admin generates a login OTP** — click the **"Set Login"** button on any member row.
3. **Enter the member's email** (used as their login username) and click **Generate OTP**.
4. A one-time 8-character password appears on screen (e.g. `A3F89B2C`).
5. **Admin shares** the email + OTP with the member (verbally, WhatsApp, etc.).
6. **Member logs in** at `/login` using their email + OTP as the password.
7. **Member changes their password** — click **Change Password** in the sidebar (required after first login).

Important: member login OTPs are currently returned to the admin in the API response and are not emailed automatically.

### Forgot password

If a member forgets their password:
1. Admin goes to Members page.
2. Clicks **"Reset OTP"** on that member's row.
3. A new OTP is generated — the old password is immediately invalidated.
4. Admin shares the new OTP with the member.

### Member view (read-only)

After logging in, members can see:
- Dashboard summary (their payment status, loan info)
- Their payment history
- All group members list
- Loan details
- Charity records
- Group rules
- Reports

They **cannot** make any changes — all write operations require the admin role.

---

## Key Workflows

### Member management

- Admins can add members individually or bulk import rows from spreadsheet-style pasted data.
- Members can be marked inactive without deleting their records.
- Admins can create or reset member login OTPs from the Members page.

### Payments

- Monthly dues are generated from contribution rules.
- Admins can record payments, which updates the fund ledger and generates a PDF receipt.
- Payment receipts can be downloaded by both admins and users.
- Reminder sending can notify members by email and also attempt WhatsApp when a valid phone number is present.

### Loans

- Admins can create and approve loans, then track installments and repayments.
- Loan deletion is a two-step flow: request an emailed verification code, then confirm deletion with that code.
- Deleting a loan also reverses related fund ledger effects.

### Reports and audit

- Admin reports currently export admin-only `.xlsx` files.
- User reports exist as a page, but export is restricted to admins.
- Admin audit history is available in the audit section.

---

## Email Sending

The app sends email directly over SMTP using the custom sender in `src/services/email.ts`. It opens a Node socket, performs `EHLO`, upgrades with `STARTTLS` when `EMAIL_SECURE=false`, authenticates with `AUTH LOGIN`, and then sends the MIME message. HTML emails and file attachments are supported.

### Required environment variables

| Variable | Purpose |
|---|---|
| `EMAIL_HOST` | SMTP server hostname |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_SECURE` | `true` for direct TLS, `false` for STARTTLS upgrade |
| `EMAIL_USER` | SMTP login user |
| `EMAIL_PASS` | SMTP login password / app password |
| `EMAIL_FROM` | Optional From header shown to recipients |
| `EMAIL_HELO_HOST` | Optional hostname used in the SMTP `EHLO` command |

If `EMAIL_USER` or `EMAIL_PASS` is missing, mail-sending routes fail with a server error explaining that email is not configured.

### HTTP routes that trigger email

| Route | What it sends |
|---|---|
| `POST /api/admin/payments/reminders` | Pending-payment reminder emails to members with an email address |
| Admin payment recording flow | Receipt email with attached PDF sent from `src/services/payments.ts` after a payment is recorded |
| `POST /api/admin/loans/[id]/delete/request` | One-time loan deletion verification code emailed to active admins |

### Notification behavior

- Payment reminders use `src/services/notifications.ts`, which tries email first when an email address exists and then also attempts WhatsApp if a valid phone number exists.
- Receipt emails are best-effort: payment recording still succeeds if email delivery fails, and the error is logged server-side.
- Loan delete verification requires email to be configured, because the code is delivered to admin inboxes before deletion can be confirmed.

---

## WhatsApp Sending

WhatsApp reminders are sent through the Meta WhatsApp Cloud API in `src/services/whatsapp.ts`.

### Required environment variables

| Variable | Purpose |
|---|---|
| `WHATSAPP_ACCESS_TOKEN` | Meta access token |
| `WHATSAPP_PHONE_NUMBER_ID` | Sender phone number ID |
| `WHATSAPP_API_VERSION` | Optional Graph API version, default `v19.0` |
| `WHATSAPP_LANGUAGE_CODE` | Optional template language code, default `en_US` |
| `WHATSAPP_DEFAULT_TEMPLATE` | Default template name used by reminder sending |

WhatsApp delivery is attempted for payment reminders when the member has a valid phone number. Failures are logged, but reminder processing continues.

### Gmail example

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="youraccount@gmail.com"
EMAIL_PASS="your-google-app-password"
EMAIL_FROM="People's Youth <youraccount@gmail.com>"
```

For Gmail, use an App Password instead of your normal account password.

---

## User Roles

| Role | Access |
|---|---|
| `ADMIN` | Full access — create/edit/delete all records, manage member logins |
| `USER` | Read-only — view all data, change their own password |

---

## Default Credentials (after seed)

| | Value |
|---|---|
| Admin email | Set via `SEED_ADMIN_EMAIL` env var |
| Admin password | Set via `SEED_ADMIN_PASSWORD` env var |

**Never commit real passwords to git.** Use environment variables.

---

## Useful Commands

```bash
# Start dev server
npm run dev

# Production-style build (also applies pending migrations)
npm run build

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (visual DB browser)
npm run prisma:studio

# Run seed
npm run seed

# Wipe transactional data (keep Members + Users)
npm run db:wipe

# TypeScript type check
npx tsc --noEmit

# Migration status
npx prisma migrate status
```

---

## Multi-Tenancy

Every association ("tenant") is isolated at the row level:

- A `Tenant` model owns every tenant-scoped record — all major tables carry a `tenantId` foreign key with tenant-composite unique indexes (e.g. `(tenantId, email)` on `User`, `(tenantId, memberUid)` on `Member`).
- Queries go through the tenant-scoped helpers in `src/lib/tenantPrisma.ts`, so one group's data is never visible to another.
- New tenants are created through the OTP-gated `/system/onboard-tenant` page, usable only by the operator email in `ONBOARDING_ALLOWED_EMAIL`. The new tenant's admin receives an email to set their own password.
- Each tenant can customize its organization name and upload a logo (Cloudinary), which is shown across that tenant's admin and user UI and in emails.
- Pre-existing single-group data was migrated into a `default-tenant-000001` tenant by the `multi_tenant_row_level_isolation` migration.

---

## Future Planned Features

- Richer WhatsApp / SMS notification coverage
- Tenant self-signup without operator involvement
