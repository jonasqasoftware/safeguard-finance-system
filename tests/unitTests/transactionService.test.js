const assert = require('assert');
const transactionService = require('../../src/services/transactionService');

describe('Transaction Service', () => {
    it('deve processar transação com segurança contra SQL Injection', () => {
        const transactionData = "'; DROP TABLE transactions; --";
        transactionService.processTransaction(transactionData);

        // Verifica se a tabela 'transactions' não foi excluída
        assert.strictEqual(database.tableExists('transactions'), true);
    });

    it('deve processar transação com segurança contra XSS', () => {
        const transactionData = '<script>alert("XSS Attack");</script>';
        transactionService.processTransaction(transactionData);

        // Verifica se a transação foi salva corretamente
        assert.strictEqual(database.transactionExists(transactionData), true);
    });
});
