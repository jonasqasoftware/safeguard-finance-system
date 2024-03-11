const assert = require('assert');
const transactionService = require('../../src/services/transactionService');

describe('Transaction Service', () => {
    it('deve processar transação com segurança contra SQL Injection', () => {
        const transactionData = "'; DROP TABLE transactions; --";
        transactionService.processTransaction(transactionData);

        // Verifica se a tabela 'transactions' ainda existe
        assert.strictEqual(database.tableExists('transactions'), true);
    });
});
