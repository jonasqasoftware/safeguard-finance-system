const assert = require('assert');
const authService = require('../../src/services/authenticationService');

describe('Authentication Service', () => {
    it('deve autenticar o usuário com sucesso', () => {
        // Teste de autenticação
        assert.strictEqual(authService.loginUser('usuario', 'senha'), true);
    });
});
