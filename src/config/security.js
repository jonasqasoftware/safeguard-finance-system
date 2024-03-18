// Enumerador para os papéis permitidos
const Roles = {
  USER: 'user',
  ADMIN: 'admin',
}

const securityService = {
  validateSession: (sessionData) => {
    // Verifica se os dados da sessão são válidos
    if (!isValidSessionData(sessionData)) {
      return false // Sessão inválida se dados ausentes ou incorretos
    }

    // Lógica para validar a sessão
    switch (sessionData.role) {
      case Roles.USER:
        // Se o papel for de usuário normal, considera a sessão válida
        return true
      case Roles.ADMIN:
        // Se o papel for de administrador, verifica se houve tentativa de roubo
        return isSessionTheftAttempt(sessionData)
      default:
        return false // Papel desconhecido
    }
  },
}

function isValidSessionData(sessionData) {
  // Verifica se os dados da sessão estão presentes e são válidos
  return sessionData && sessionData.userId && sessionData.role
}

function isSessionTheftAttempt(sessionData) {
  // Lógica para detectar tentativa de roubo de sessão
  // Adicione aqui a lógica real de detecção de roubo de sessão
  if (sessionData.modified) {
    console.warn(
      'Tentativa de roubo de sessão detectada: modificação detectada na sessão.',
    )
    return true
  }

  // Outras verificações de tentativas de roubo de sessão podem ser adicionadas aqui
  // Por exemplo, verificação de IP, detecção de múltiplas sessões simultâneas, etc.

  return false // Se nenhuma tentativa de roubo for detectada
}

function simulateXSS(payload) {
  // Verifica se o payload contém alguma tag script
  const hasScriptTag = /<script.*?>.*?<\/script>/i.test(payload)

  // Retorna true se a tag script for encontrada, indicando um possível ataque XSS
  return hasScriptTag
}

function simulateSqlInjection(payload) {
  // Verifica se o payload contém caracteres especiais comuns usados em injeções de SQL
  const sqlSpecialChars = [
    "'",
    ';',
    '--',
    '/*',
    '*/',
    'UNION',
    'SELECT',
    'INSERT',
    'UPDATE',
    'DELETE',
  ]

  for (const char of sqlSpecialChars) {
    if (payload.includes(char)) {
      // Se encontrar algum caractere especial, retorna true indicando que o ataque foi detectado
      return true
    }
  }

  // Se nenhum caractere especial for encontrado, retorna false indicando que não foi detectado nenhum ataque
  return false
}

export {
  securityService,
  isValidSessionData,
  isSessionTheftAttempt,
  simulateXSS,
  simulateSqlInjection,
}
