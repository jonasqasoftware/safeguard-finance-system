// Importe o módulo de segurança com a extensão .js (ou apropriada)
import security from '../../config/security.js'

// Middleware de segurança
function securityMiddleware(req, res, next) {
  // Adicione outros middlewares de segurança conforme necessário
  req.body = security.sanitizeHTML(req.body)
  next()
}

// Exporte o middleware de segurança
export default securityMiddleware
