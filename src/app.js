import crypto from 'node:crypto'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { authenticate, containsSqlMetaCharacters, sanitizeText, verifyToken } from './security.js'
import { TransactionStore } from './transactions.js'

const error = (code, message) => ({ code, message })

export function createApp(config, dependencies = {}) {
  const app = express()
  const store = dependencies.store || new TransactionStore()
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(express.json({ limit: '10kb', strict: true }))
  app.use(rateLimit({ windowMs: 60_000, limit: config.rateLimit, standardHeaders: 'draft-7', legacyHeaders: false }))
  app.use((request, response, next) => {
    const requestId = request.get('x-request-id') || crypto.randomUUID()
    response.set('x-request-id', requestId)
    response.on('finish', () => {
      if (process.env.NODE_ENV !== 'test')
        console.log(
          JSON.stringify({
            event: 'request.completed',
            requestId,
            method: request.method,
            path: request.path,
            status: response.statusCode,
          }),
        )
    })
    next()
  })

  app.get('/health', (_request, response) => response.status(200).json({ status: 'ok' }))
  app.post('/api/auth/login', (request, response) => {
    const token = authenticate(request.body, config)
    if (!token) return response.status(401).json(error('INVALID_CREDENTIALS', 'Invalid credentials'))
    return response.status(200).json({ token, tokenType: 'Bearer', expiresIn: 900 })
  })

  app.use('/api/transactions', (request, response, next) => {
    const authorization = request.get('authorization')
    if (!authorization?.startsWith('Bearer '))
      return response.status(401).json(error('AUTHENTICATION_REQUIRED', 'Bearer token required'))
    try {
      request.identity = verifyToken(authorization.slice(7), config.jwtSecret)
      return next()
    } catch {
      return response.status(401).json(error('INVALID_TOKEN', 'Token is invalid or expired'))
    }
  })

  app.get('/api/transactions', (_request, response) => response.status(200).json({ items: store.list() }))
  app.post('/api/transactions', (request, response) => {
    const { description, amount, currency } = request.body || {}
    if (
      typeof description !== 'string' ||
      typeof amount !== 'number' ||
      amount <= 0 ||
      !/^[A-Z]{3}$/.test(currency || '')
    ) {
      return response
        .status(400)
        .json(error('INVALID_TRANSACTION', 'description, positive amount, and ISO currency are required'))
    }
    if (containsSqlMetaCharacters(description))
      return response.status(400).json(error('SUSPICIOUS_INPUT', 'Description contains unsupported control characters'))
    const cleanDescription = sanitizeText(description)
    if (!cleanDescription)
      return response.status(400).json(error('INVALID_TRANSACTION', 'Description cannot be empty after sanitization'))
    const transaction = store.add({ description: cleanDescription, amount, currency, createdBy: request.identity.sub })
    return response.status(201).json(transaction)
  })

  app.use((errorValue, _request, response, next) => {
    if (errorValue instanceof SyntaxError && 'body' in errorValue)
      return response.status(400).json(error('INVALID_JSON', 'Request body must be valid JSON'))
    return next(errorValue)
  })
  app.use((_request, response) => response.status(404).json(error('ROUTE_NOT_FOUND', 'Route not found')))
  return app
}
