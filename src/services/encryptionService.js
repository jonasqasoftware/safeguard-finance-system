// encryptionService.js

import crypto from 'crypto'

/**
 * Criptografa os dados usando a chave de criptografia fornecida.
 * @param {string} data - Os dados a serem criptografados.
 * @param {string} encryptionKey - A chave de criptografia.
 * @returns {string} - Os dados criptografados.
 */
function encryptData(data, encryptionKey) {
  if (typeof encryptionKey !== 'string') {
    throw new TypeError('A chave de criptografia deve ser uma string')
  }

  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey)
  let encryptedData = cipher.update(data, 'utf-8', 'hex')
  encryptedData += cipher.final('hex')
  return encryptedData
}

/**
 * Descriptografa os dados usando a chave de criptografia fornecida.
 * @param {string} encryptedData - Os dados criptografados a serem descriptografados.
 * @param {string} encryptionKey - A chave de criptografia.
 * @returns {string} - Os dados descriptografados.
 */
function decryptData(encryptedData, encryptionKey) {
  if (typeof encryptionKey !== 'string') {
    throw new TypeError('A chave de criptografia deve ser uma string')
  }

  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey)
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8')
  decryptedData += decipher.final('utf-8')
  return decryptedData
}

export { encryptData, decryptData }
import crypto from 'crypto'

// Chave de criptografia. Certifique-se de usar uma chave segura em um ambiente de produção.
const encryptionKey = 'sua_chave_secreta'

export function encryptData(data) {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey)
  let encryptedData = cipher.update(data, 'utf-8', 'hex')
  encryptedData += cipher.final('hex')
  return encryptedData
}

export function decryptData(encryptedData) {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey)
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8')
  decryptedData += decipher.final('utf-8')
  return decryptedData
}

// Exemplo de uso
// const dataToEncrypt = 'Dados confidenciais';
// const encryptedData = encryptData(dataToEncrypt);
// console.log('Dados criptografados:', encryptedData);
// const decryptedData = decryptData(encryptedData);
// console.log('Dados descriptografados:', decryptedData);
