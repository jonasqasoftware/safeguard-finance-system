import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// Gere uma chave aleatória para JWT
const jwtSecret = crypto.randomBytes(32).toString('hex')

// Configure a variável de ambiente para desenvolvimento (não recomendado para produção)
process.env.JWT_SECRET = jwtSecret

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export { generateToken, jwtSecret }
