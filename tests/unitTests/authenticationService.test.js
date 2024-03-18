import assert from 'assert'
import { loginUser } from '../../src/services/authenticationService.js'

describe('Authentication Service', () => {
  it('deve autenticar o usuário com sucesso', () => {
    // Teste de autenticação
    const token = loginUser('admin', 'senhaSecreta')
    assert.notStrictEqual(token, null)
  })
})
