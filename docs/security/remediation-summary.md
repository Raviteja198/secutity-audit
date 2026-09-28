# Security remediation summary

## Implemented in this repository

| Improvement | Risk addressed |
| --- | --- |
| Tenant-scoped Prisma access in `forTenant` | Cross-tenant data exposure through ORM queries |
| Route-level `requireAuth` and `requireAdmin` checks | Direct API invocation and client-side role bypass |
| Reject ambiguous login emails across tenants | Arbitrary tenant/account selection by `findFirst` |
| Five-attempt local credential throttle with a ten-minute window | Basic password-guessing abuse |
| Dummy bcrypt verification for unselectable accounts | Different failure timing for unknown or ambiguous accounts |
| Generic production responses for 5xx errors | Leakage of database, provider, or implementation details |
| CSP and browser security headers | Script/object injection, framing, and unsafe browser defaults |
| Test-mode email redirect | Delivery of test receipts, reminders, or OTPs to real members |
| Tenant-scoped administrator audit log | Weak accountability for financial and membership changes |

## Required deployment controls

- Set a high-entropy `NEXTAUTH_SECRET`, `CRON_SECRET`, database URLs, and provider credentials through the host's secret manager—not source control.
- Set `CRON_SECRET`; an unset value would make the scheduled-reminder endpoint callable without a bearer secret.
- Keep `TEST_MODE=true` outside production and set a controlled `TEST_MODE_EMAIL`.
- Enforce login rate limiting at the CDN, reverse proxy, or a shared store for horizontally scaled deployments; the in-process fallback cannot coordinate multiple instances.
- Review every new raw SQL query for a bound tenant predicate and every new external browser origin for CSP changes.

## Release gate

Before deployment, complete the scenarios in [test-plan.md](test-plan.md), review dependency advisories, verify response headers on the deployed origin, and keep sanitized evidence with the release record.
