import assert from 'assert'
import { simulateXSS } from '../../src/config/security.js'

describe('Penetration Test - Cross-Site Scripting (XSS)', () => {
  it('deve detectar e prevenir ataques XSS', async () => {
    // Simulação de ataque XSS
    const result = await simulateXSS('<script>alert("XSS Attack");</script>')
    assert.strictEqual(result, true) // Alterado para true se a simulação for bem-sucedida
  })
})
