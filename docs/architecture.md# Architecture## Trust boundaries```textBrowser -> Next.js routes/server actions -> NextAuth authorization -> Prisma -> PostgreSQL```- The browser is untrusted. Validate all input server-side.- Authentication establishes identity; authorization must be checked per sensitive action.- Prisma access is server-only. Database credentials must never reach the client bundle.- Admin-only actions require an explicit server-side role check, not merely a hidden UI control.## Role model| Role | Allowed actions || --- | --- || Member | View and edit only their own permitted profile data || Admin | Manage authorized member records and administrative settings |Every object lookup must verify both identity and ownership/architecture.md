# Architecture

## Trust boundaries

```text
Browser -> Next.js routes/server actions -> NextAuth authorization -> Prisma -> PostgreSQL
```

- The browser is untrusted. Validate all input server-side.
- Authentication establishes identity; authorization must be checked per sensitive action.
- Prisma access is server-only. Database credentials must never reach the client bundle.
- Admin-only actions require an explicit server-side role check, not merely a hidden UI control.

## Role model

| Role | Allowed actions |
| --- | --- |
| Member | View and edit only their own permitted profile data |
| Admin | Manage authorized member records and administrative settings |

Every object lookup must verify both identity and ownership/role before returning data or changing state.
