# Authorized security test plan

Run only against a local or explicitly authorized non-production deployment with `TEST_MODE=true` and test credentials.

## Access-control checks

1. Sign in as a member; request admin pages and `/api/admin/*`. Expect redirect/403, never data.
2. Sign in as tenant A; replace an entity ID with one from tenant B in every by-ID admin and user API. Expect 404 or 403, never data or mutation.
3. Call protected APIs with no session, an expired session, and a token without `tenantId`. Expect 401.
4. Confirm an administrator can act only within the administrator's tenant.

## Authentication checks

1. Attempt sign-in with an unknown email, wrong password, inactive account, and ambiguous multi-tenant email. Expect the same generic failure.
2. Make six failed sign-in attempts from the same test IP/email in ten minutes. The sixth attempt must be rejected.
3. Verify successful sign-in clears that account's local attempt bucket.
4. Test OTP/reset-code expiry, reuse, and incorrect-code limits without sending real mail.

## Input and configuration checks

1. Send malformed JSON, oversized strings, invalid dates, invalid enums, and invalid upload MIME types to all write routes.
2. Review each `$queryRaw` call for an explicit `tenantId` predicate and Prisma-bound values.
3. Inspect production response headers and ensure `NEXTAUTH_SECRET`, `CRON_SECRET`, database credentials, and provider secrets are set only as deployment secrets.
4. Trigger a controlled server failure in a non-production environment; production responses must not expose a stack trace, database URL, token, or password.

## Evidence requirements

Record request/response metadata, role, tenant, expected result, actual result, and remediation. Redact cookies, tokens, passwords, database URLs, phone numbers, email addresses, and financial data before committing evidence.
