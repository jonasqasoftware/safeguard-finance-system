const database = require('../config/database');
const security = require('../config/security');

function processTransaction(transactionData) {
    // Lógica de processamento de transação
    const sanitizedData = sanitizeInput(transactionData);
    database.saveTransaction(sanitizedData);
}

function sanitizeInput(data) {
    // Implementação da sanitização para prevenção de XSS
    return security.sanitizeHTML(data);
}

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
