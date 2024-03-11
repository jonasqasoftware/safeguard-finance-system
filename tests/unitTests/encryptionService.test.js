const assert = require('assert');
const encryptionService = require('../../src/services/encryptionService');

describe('Encryption Service', () => {
    it('deve criptografar e descriptografar dados com sucesso', () => {
        const data = 'dados_confidenciais';
        const encryptedData = encryptionService.encryptData(data);
        const decryptedData = encryptionService.decryptData(encryptedData);

        assert.strictEqual(decryptedData, data);
    });
});
