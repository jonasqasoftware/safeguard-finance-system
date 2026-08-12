# Threat Model

## Scope and assets

The scope is the HTTP API process and its in-memory transaction data. Assets are administrator credentials, JWT signing material, bearer tokens, transaction integrity, and useful security telemetry. Browser UI, database, cloud infrastructure, and payment processing are out of scope.

## Trust boundaries

1. Untrusted clients cross the public HTTP boundary.
2. Valid bearer tokens cross the authentication boundary into protected routes.
3. Environment configuration crosses the process-start boundary.
4. Validated transaction objects cross into ephemeral in-memory storage.

## Abuse cases and mitigations

- An attacker guesses credentials: timing-safe comparison reduces response-timing leakage and rate limiting constrains request volume.
- An attacker forges or modifies a JWT: signature, algorithm, issuer, audience, and expiration are verified.
- A client submits executable markup: tags and script bodies are removed before storage; clients must still encode output.
- A client submits SQL-shaped control strings: the lab rejects them. A future persistence layer must use parameterized queries instead of relying on this heuristic.
- A client sends malformed or excessive input: strict parsing, a body-size ceiling, field constraints, and stable 4xx errors limit processing.
- An operator starts with unsafe defaults: startup fails when secrets or credentials are missing and rejects short JWT secrets.
- Sensitive values leak through logs: request logs contain method, path, status, and correlation ID only.

## Residual risks

The single administrator identity has no lockout, MFA, lifecycle, or revocation. Rate limits and transactions are process-local. There is no encrypted persistence, TLS configuration, distributed audit trail, security monitoring backend, DAST, fuzzing, or independent penetration test. These are deliberate boundaries of a portfolio lab, not completed production controls.
