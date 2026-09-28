# OWASP Top 10 checklist

This checklist is a repeatable review aid, not a claim that the product is automatically compliant.

| OWASP area | Product control | Verification |
| --- | --- | --- |
| A01 Broken Access Control | `requireAdmin`, `requireAuth`, JWT tenant claim, `forTenant` query extension | Test cross-tenant IDs and a member calling every admin API. |
| A02 Cryptographic Failures | bcrypt password hashes, environment-only secrets, TLS SMTP | Review logs/configuration; ensure no secret or password hash enters a response. |
| A03 Injection | Zod validation, Prisma parameterization, constrained imports/uploads | Fuzz JSON, URL, and bulk-import inputs; review every raw SQL statement. |
| A04 Insecure Design | Threat model, tenant isolation, OTP confirmation before destructive loan deletion | Review new workflows before implementation. |
| A05 Security Misconfiguration | Security headers, `TEST_MODE`, generic production 5xx errors, protected cron secret | Inspect deployed response headers and environment settings. |
| A06 Vulnerable Components | Lockfile and dependency review | Run dependency scanning in CI and patch supported releases. |
| A07 Identification and Authentication Failures | bcrypt, generic failure result, local login throttling, ambiguity-safe email lookup | Test invalid login, inactive users, six failed attempts, reset and OTP expiry. |
| A08 Software and Data Integrity Failures | Prisma migrations and audited admin actions | Review migration history and CI provenance before release. |
| A09 Security Logging and Monitoring Failures | Tenant-scoped audit log for sensitive admin actions | Confirm create/update/delete actions record actor, tenant, action, and target. |
| A10 Server-Side Request Forgery | No user-controlled server-side URL fetch is permitted | Review integrations and reject any new arbitrary URL fetch feature by default. |

Known follow-up: the in-memory sign-in limiter is per application instance. Production must add a shared/edge throttle before depending on it as the only brute-force defense.
