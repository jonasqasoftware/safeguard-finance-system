// sessionTheft.test.js

import assert from 'assert'
import securityService, { Roles } from '../../src/services/securityService.js'

describe('Session Theft Tests', () => {
  // Teste para verificar se tentativa de roubo de sessão é detectada
  it('deve detectar tentativa de roubo de sessão', () => {
    const sessionData = {
      userId: '123',
      username: 'usuario-exemplo',
      role: Roles.USER, // Use Roles.USER para referenciar o papel do usuário
    }

    const modifiedSessionData = { ...sessionData, role: Roles.ADMIN } // Use Roles.ADMIN para referenciar o papel do administrador

    securityService.validateSession(sessionData)

    const sessionTheftDetected =
      securityService.validateSession(modifiedSessionData)

    assert.strictEqual(sessionTheftDetected, false) // Não deve detectar a tentativa de roubo de sessão
  })

  // Teste para verificar se sessão válida é permitida
  it('deve permitir sessão válida', () => {
    const sessionData = {
      userId: '123',
      username: 'usuario-exemplo',
      role: Roles.USER, // Use Roles.USER para referenciar o papel do usuário
    }

    const validSession = securityService.validateSession(sessionData)

    assert.strictEqual(validSession, true) // Deve permitir a sessão válida
  })
})
