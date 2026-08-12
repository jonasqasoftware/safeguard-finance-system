# Risk-based Quality Strategy

## Objective

Provide reproducible evidence that the API rejects unsafe states while preserving its intended authenticated transaction flow. Tests run locally and on every pull request; no external service or production credential is required.

## Risk-to-test matrix

| Risk                      | Control                                                | Automated evidence                                           | Residual limitation                                                         |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Authentication bypass     | Protected router and bearer-token verification         | Missing and forged-token API tests                           | Single configured lab identity; no user lifecycle                           |
| Token misuse              | Short expiry; issuer, audience, and algorithm pinning  | Valid login plus forged-token rejection                      | No revocation store or key rotation                                         |
| Brute-force/abuse         | Global per-process rate limit                          | Boundary test receives HTTP 429                              | In-memory counters do not coordinate multiple instances                     |
| XSS-shaped input          | Strip executable markup before storage                 | Script/tag sanitization at unit and API levels               | Clients still must encode output for their rendering context                |
| SQL-shaped input          | Reject unsupported control sequences                   | Negative API and unit tests                                  | No database exists; parameterized queries are required if one is introduced |
| Malformed/oversized input | Strict JSON parser, 10 KB body limit, field validation | Malformed JSON and invalid transaction tests                 | Fuzzing is not included                                                     |
| Secret leakage            | Required environment injection and ignored `.env`      | Configuration failure tests and repository secret scan in CI | Runtime secret-manager integration is outside this lab                      |
| Weak HTTP defaults        | Helmet and disabled framework banner                   | Header assertions                                            | TLS termination belongs to the deployment platform                          |
| Poor diagnosability       | Request ID and structured request metadata             | Header assertion                                             | No centralized log aggregation                                              |

## Test layers

1. Unit tests target configuration and pure security helpers.
2. API integration tests exercise middleware order, error contracts, authorization, validation, and the core workflow.
3. CI runs lint, format checks, tests with coverage output, dependency audit, and a lightweight secret-pattern scan.

Coverage is diagnostic evidence, not a release target. Risk coverage and meaningful assertions take priority over maximizing a percentage.

## Exit criteria

- `npm run validate` succeeds from a clean install.
- `npm audit --omit=dev` reports no known production dependency vulnerability.
- No credentials or private-key markers are present in tracked source.
- Documentation states the project's limits without compliance or production-readiness claims.
