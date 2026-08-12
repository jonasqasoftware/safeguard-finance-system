import assert from 'node:assert/strict'
import test from 'node:test'
import { loadConfig } from '../src/config.js'

test('fails closed when required configuration is absent', () => {
  assert.throws(() => loadConfig({}), /JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD/)
})

test('rejects a weak JWT secret', () => {
  assert.throws(
    () => loadConfig({ JWT_SECRET: 'short', ADMIN_USERNAME: 'admin', ADMIN_PASSWORD: 'password' }),
    /at least 32 characters/,
  )
})

test('loads explicit configuration and safe defaults', () => {
  const config = loadConfig({ JWT_SECRET: 'a'.repeat(32), ADMIN_USERNAME: 'admin', ADMIN_PASSWORD: 'password' })
  assert.deepEqual(config, {
    port: 3000,
    jwtSecret: 'a'.repeat(32),
    adminUsername: 'admin',
    adminPassword: 'password',
    rateLimit: 100,
  })
})
