const assert = require('assert');
const { simulateSqlInjection } = require('../../src/security');

describe('Penetration Test - SQL Injection', () => {
    it('deve detectar e prevenir injeção de SQL', () => {
        // Simulação de ataque de injeção de SQL
        assert.strictEqual(simulateSqlInjection(), false);
    });
});
