const database = require('../config/database');

function processTransaction(transactionData) {
    // Lógica de processamento de transação
    const sanitizedData = sanitizeInput(transactionData);
    database.saveTransaction(sanitizedData);
}

function sanitizeInput(data) {
    // Implementação da sanitização para prevenção de SQL Injection
    return data.replace(/'/g, "''");
}

module.exports = {
    processTransaction,
};
