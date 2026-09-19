# Secure Youth Management System

A production-style role-based Youth Management System designed as a hands-on web-application security portfolio project.

## Security focus

This repository documents an authorized OWASP Top 10 assessment of the application, including threat modeling, test cases, sanitized evidence, remediation notes, and regression checks. The assessment focuses on the Admin and Member authorization boundary, authentication/session security, and secure configuration.

> **Authorization:** Security testing is performed only against systems and data owned or explicitly authorized by the project maintainer. Evidence is sanitized; no secrets, personal data, or exploitable production details are committed.

## Stack

- Next.js
- NextAuth
- Prisma
- PostgreSQL
- OWASP ZAP and Burp Suite Community Edition

## Assessment scope

| Area | Examples |
| --- | --- |
| Broken access control | IDOR/BOLA, privilege escalation, missing server-side role checks |
| Authentication | Session handling, logout invalidation, rate limiting, account enumeration |
| Security misconfiguration | Headers, CORS, verbose errors, secret handling |
| Input handling | Schema validation, unsafe redirects, injection-resistant data access |

## Documentation

- [Architecture](docs/architecture.md)
- [Threat model](security/threat-model.md)
- [OWASP test checklist](security/owasp-top-10-checklist.md)
- [Findings index](security/findings/README.md)
- [Remediation summary](security/remediation-summary.md)

## Responsible disclosure

If you discover a vulnerability in a deployed instance, do not publish exploit details or access data. Contact the repository owner privately with a minimal proof of concept.
