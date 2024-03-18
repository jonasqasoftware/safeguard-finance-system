// Importando módulos ESM
import { saveTransaction } from '../config/database.js'
import { sanitizeHTML } from '../config/security.js'

// Função para processar transação
function processTransaction(transactionData) {
  // Lógica de processamento de transação
  const sanitizedData = sanitizeInput(transactionData)
  saveTransaction(sanitizedData)


// Função para sanitizar input (prevenção de XSS)
function sanitizeInput(data) {
  return sanitizeHTML(data)
}

// Exportando a função de processamento de transação
export { processTransaction }

// Definindo a classe SecurityLogService
class SecurityLogService {
  constructor() {
    this.logs = []
  }

  // Método para obter logs
  getLogs() {
    return this.logs
  }
}

// Exportando uma instância única do serviço
export default new SecurityLogService()
