# Youth Management security audit

This is the OWASP-focused security assessment for the Youth Management product. It is part of this repository so the controls, evidence, remediation work, and product changes stay in sync.

## Scope

- Next.js pages and route handlers
- NextAuth credentials and Google sign-in
- JWT session claims, role enforcement, and tenant isolation
- Prisma/PostgreSQL data access
- Password-reset, onboarding, member-login, reporting, receipt, and reminder flows
- Deployment configuration, browser headers, email delivery, Cloudinary, and cron endpoints

The assessment does not authorize testing of third-party services, production accounts, or data that the tester does not own. Use local or explicitly authorized non-production environments only.

## Security model

```text
request → middleware → route-level authentication/role check
        → tenant-scoped Prisma client → PostgreSQL
        → audit event for sensitive admin changes
```

The database is shared by tenants. `forTenant(tenantId)` injects the session tenant into every supported Prisma operation. Any raw SQL must explicitly filter by `tenantId`; reviewers must verify this during every code review.

See [threat model](threat-model.md), [OWASP checklist](owasp-top-10-checklist.md), and [test plan](test-plan.md).
