const security = require('../../config/security');

function securityMiddleware(req, res, next) {
    // Adicione outros middlewares de segurança conforme necessário
    req.body = security.sanitizeHTML(req.body);
    next();
}

module.exports = securityMiddleware;
