import { jwtSecret } from '../config/auth.js'
import jwt from 'jsonwebtoken'

// Função de autenticação de usuário
function loginUser(username, password) {
  // Lógica de autenticação
  if (username === 'admin' && password === 'senhaSecreta') {
    // Gera um token JWT com o nome de usuário (pode adicionar mais informações conforme necessário)
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' })
    return token
  } else {
    return null // Retornar null em caso de falha na autenticação
  }
}

// Exportar a função de autenticação
export { loginUser }
