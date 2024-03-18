class SecurityLogService {
  constructor() {
    this.logs = []
  }

  logEvent(eventName, details) {
    const timestamp = new Date().toISOString()
    const logEntry = `${timestamp} - ${eventName}: ${details}`
    this.logs.push(logEntry)

    console.log(logEntry) // Apenas para exibir no console por enquanto
  }

  getLogs() {
    return this.logs
  }
}

// Exporte a classe para poder criar instâncias em outros lugares, se necessário
export { SecurityLogService }
