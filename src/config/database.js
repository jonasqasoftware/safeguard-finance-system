import { Sequelize } from 'sequelize'
import User from '../models/User.js'

// Configurações do banco de dados
const databaseConfig = {
  database: process.env.DB_NAME || 'safeguard_finance_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: process.env.DB_LOGGING === 'true', // Ativar/desativar logs do Sequelize
}

// Inicializa a conexão com o banco de dados
const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect,
    logging: databaseConfig.logging ? console.log : false,
  },
)

// Verifica a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.')

    // Sincronize o modelo com o banco de dados
    return sequelize.sync({ force: false }) // Use { force: true } para recriar as tabelas em cada reinicialização
  })
  .then(() => {
    console.log('Modelos sincronizados com sucesso.')
  })
  .catch((error) => {
    console.error(
      'Erro ao conectar ou sincronizar com o banco de dados:',
      error,
    )
  })

// Exporta a instância do Sequelize
export default sequelize
