import assert from 'node:assert/strict'
import test from 'node:test'
import request from 'supertest'
import { createApp } from '../src/app.js'

const config = {
  jwtSecret: 'test-secret-that-is-at-least-32-characters',
  adminUsername: 'quality-admin',
  adminPassword: 'local-test-password',
  rateLimit: 100,
}

async function tokenFor(app) {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ username: config.adminUsername, password: config.adminPassword })
  return response.body.token
}

test('health endpoint exposes defensive headers and request correlation', async () => {
  const response = await request(createApp(config)).get('/health').expect(200)
  assert.equal(response.body.status, 'ok')
  assert.ok(response.headers['content-security-policy'])
  assert.ok(response.headers['x-request-id'])
  assert.equal(response.headers['x-powered-by'], undefined)
})

test('authentication rejects bad credentials and issues a short-lived bearer token for valid credentials', async () => {
  const app = createApp(config)
  await request(app).post('/api/auth/login').send({ username: 'attacker', password: 'wrong' }).expect(401)
  const response = await request(app)
    .post('/api/auth/login')
    .send({ username: config.adminUsername, password: config.adminPassword })
    .expect(200)
  assert.equal(response.body.tokenType, 'Bearer')
  assert.equal(response.body.expiresIn, 900)
  assert.equal(typeof response.body.token, 'string')
})

test('transaction routes reject missing and forged tokens', async () => {
  const app = createApp(config)
  await request(app)
    .get('/api/transactions')
    .expect(401, { code: 'AUTHENTICATION_REQUIRED', message: 'Bearer token required' })
  await request(app)
    .get('/api/transactions')
    .set('authorization', 'Bearer forged')
    .expect(401, { code: 'INVALID_TOKEN', message: 'Token is invalid or expired' })
})

test('transaction validation blocks malformed and SQL-shaped input', async () => {
  const app = createApp(config)
  const token = await tokenFor(app)
  await request(app)
    .post('/api/transactions')
    .set('authorization', `Bearer ${token}`)
    .send({ description: 'Invalid', amount: -1, currency: 'usd' })
    .expect(400)
  await request(app)
    .post('/api/transactions')
    .set('authorization', `Bearer ${token}`)
    .send({ description: "x' OR 1=1; --", amount: 10, currency: 'USD' })
    .expect(400, { code: 'SUSPICIOUS_INPUT', message: 'Description contains unsupported control characters' })
})

test('authenticated flow sanitizes markup and preserves an auditable transaction owner', async () => {
  const app = createApp(config)
  const token = await tokenFor(app)
  const created = await request(app)
    .post('/api/transactions')
    .set('authorization', `Bearer ${token}`)
    .send({ description: 'Invoice <script>alert(1)</script><b>approved</b>', amount: 42.5, currency: 'BRL' })
    .expect(201)
  assert.equal(created.body.description, 'Invoice approved')
  assert.equal(created.body.createdBy, config.adminUsername)
  assert.ok(created.body.id)
  const list = await request(app).get('/api/transactions').set('authorization', `Bearer ${token}`).expect(200)
  assert.equal(list.body.items.length, 1)
})

test('malformed JSON and unknown routes return stable error contracts', async () => {
  const app = createApp(config)
  await request(app)
    .post('/api/auth/login')
    .set('content-type', 'application/json')
    .send('{')
    .expect(400, { code: 'INVALID_JSON', message: 'Request body must be valid JSON' })
  await request(app).get('/missing').expect(404, { code: 'ROUTE_NOT_FOUND', message: 'Route not found' })
})

test('rate limiter bounds abusive request volume', async () => {
  const app = createApp({ ...config, rateLimit: 1 })
  await request(app).get('/health').expect(200)
  const response = await request(app).get('/health').expect(429)
  assert.match(response.headers.ratelimit, /remaining=0/)
})
