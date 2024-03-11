const express = require('express');
const router = express.Router();
const securityMiddleware = require('../middleware/securityMiddleware');
const transactionService = require('../../services/transactionService');
const securityConfig = require('../config/security');

const app = express();

// Configuração do Express e Rotas
app.use(securityConfig);
app.use(express.json());

// Rota para processamento seguro de transações
router.post('/transacoes', securityMiddleware, (req, res) => {
    const transactionData = req.body;

    // Verificações de segurança contra SQL Injection e XSS
    const isSqlInjectionAttempt = transactionService.simulateSqlInjection(transactionData);
    const isXSSAttempt = transactionService.simulateXSS(transactionData);

    if (isSqlInjectionAttempt || isXSSAttempt) {
        res.status(400).json({ error: 'Operação não permitida devido a tentativa de ataque.' });
    } else {
        // Lógica de processamento de transação
        transactionService.processTransaction(transactionData);

        res.status(200).json({ message: 'Transação processada com segurança.' });
    }
});

// Rotas
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
