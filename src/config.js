const MIN_SECRET_LENGTH = 32

export function loadConfig(environment) {
  const required = ['JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD']
  const missing = required.filter((name) => !environment[name])
  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(', ')}`)
  }
  if (environment.JWT_SECRET.length < MIN_SECRET_LENGTH) {
    throw new Error(`JWT_SECRET must contain at least ${MIN_SECRET_LENGTH} characters`)
  }
  return {
    port: Number(environment.PORT) || 3000,
    jwtSecret: environment.JWT_SECRET,
    adminUsername: environment.ADMIN_USERNAME,
    adminPassword: environment.ADMIN_PASSWORD,
    rateLimit: Number(environment.RATE_LIMIT_MAX) || 100,
  }
}
