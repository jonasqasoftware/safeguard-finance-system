# Contributing

Use Node.js 20 or newer. Create a focused branch, keep credentials and tokens out of commits and fixtures, and add tests for every behavior change.

Before opening a pull request, run:

```bash
npm ci
npm run validate
npm audit --omit=dev
```

Use a clear Conventional Commit message. In the pull request, describe the risk addressed, evidence collected, residual limitations, and any manual verification. Report vulnerabilities privately to the maintainer; do not place working exploits, secrets, or personal data in a public issue.
