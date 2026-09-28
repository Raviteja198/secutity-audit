# Threat model

## Assets

- Member contact data and login accounts
- Contributions, loans, charity entries, fund transactions, and receipts
- Tenant branding, reminder templates, and audit logs
- Database, OAuth, SMTP, WhatsApp, Cloudinary, and cron credentials

## Trust boundaries

| Boundary | Required control |
| --- | --- |
| Browser → protected page | Middleware verifies a valid JWT and redirects or rejects unauthenticated access. |
| Browser → API | Each sensitive route uses `requireAuth` or `requireAdmin`; middleware is not treated as the only control. |
| Session → database | `tenantId` comes from the signed session token, never from a request body or query string. |
| Prisma → PostgreSQL | `forTenant` scopes normal ORM queries. Raw SQL must include a tenant predicate. |
| App → external service | Secrets live only in environment configuration; test mode redirects email away from real members. |
| Scheduler → app | `CRON_SECRET` must be set in every deployed environment. |

## Primary abuse cases

1. A member changes an ID in a request to read or edit a different member or tenant.
2. A member invokes an admin API directly instead of using the UI.
3. An attacker guesses passwords, OTPs, reset codes, or a tenant's administrator email.
4. A duplicate email across tenants receives the wrong tenant context at sign-in.
5. A malformed upload, import row, query value, or JSON body causes unsafe data access or an information leak.
6. A deployment exposes secrets, detailed exceptions, unprotected cron execution, or real email delivery from a test environment.

## Security decisions

- A login email that matches more than one tenant is rejected rather than selecting an arbitrary account. A future tenant-selector sign-in flow must bind the selected tenant before password verification.
- Credential sign-in is limited locally to five attempts per IP/email over ten minutes. Deployments with multiple instances must additionally enforce the policy at the edge or in a shared rate-limit store.
- Administrator actions that materially change members, payments, loans, rules, charity, or reminders create audit-log entries.
