import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import xss from 'xss'

function safeEqual(left, right) {
  const leftDigest = crypto.createHash('sha256').update(left).digest()
  const rightDigest = crypto.createHash('sha256').update(right).digest()
  return crypto.timingSafeEqual(leftDigest, rightDigest)
}

export function authenticate(credentials, config) {
  if (!credentials || typeof credentials.username !== 'string' || typeof credentials.password !== 'string') return null
  if (!safeEqual(credentials.username, config.adminUsername) || !safeEqual(credentials.password, config.adminPassword))
    return null
  return jwt.sign({ sub: credentials.username, role: 'admin' }, config.jwtSecret, {
    expiresIn: '15m',
    issuer: 'safeguard-lab',
    audience: 'safeguard-api',
  })
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret, { issuer: 'safeguard-lab', audience: 'safeguard-api', algorithms: ['HS256'] })
}

export function sanitizeText(value) {
  return xss(value, { whiteList: {}, stripIgnoreTag: true, stripIgnoreTagBody: ['script'] }).trim()
}

export function containsSqlMetaCharacters(value) {
  return /(?:--|;|\/\*|\*\/|\b(?:union|select|insert|update|delete|drop)\b)/i.test(value)
}
