import security from '../../config/security.js'
import express from 'express'
import securityMiddleware from '../middleware/securityMiddleware.js'
import transactionService from '../../services/transactionService.js'
import securityConfig from '../config/security.js'

const app = express()

// Configuração do Express e Rotas
app.use(securityConfig)
app.use(express.json())

// Rota para processamento seguro de transações
app.post('/transacoes', securityMiddleware, (req, res) => {
  const transactionData = req.body

  // Verificações de segurança contra SQL Injection e XSS
  const isSqlInjectionAttempt =
    transactionService.simulateSqlInjection(transactionData)
  const isXSSAttempt = transactionService.simulateXSS(transactionData)

  if (isSqlInjectionAttempt || isXSSAttempt) {
    res
      .status(400)
      .json({ error: 'Operação não permitida devido a tentativa de ataque.' })
  } else {
    // Lógica de processamento de transação
    transactionService.processTransaction(transactionData)

    res.status(200).json({ message: 'Transação processada com segurança.' })
  }
})

// Rotas
app.use('/api', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

export default app
