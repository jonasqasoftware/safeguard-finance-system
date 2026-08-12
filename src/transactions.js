import crypto from 'node:crypto'

export class TransactionStore {
  #transactions = []

  add(transaction) {
    const stored = { id: crypto.randomUUID(), ...transaction, createdAt: new Date().toISOString() }
    this.#transactions.push(stored)
    return stored
  }

  list() {
    return this.#transactions.map((transaction) => ({ ...transaction }))
  }
}
