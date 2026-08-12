import { createApp } from './src/app.js'
import { loadConfig } from './src/config.js'

try {
  const config = loadConfig(process.env)
  const app = createApp(config)
  app.listen(config.port, () => {
    console.log(JSON.stringify({ event: 'server.started', port: config.port }))
  })
} catch (error) {
  console.error(JSON.stringify({ event: 'server.configuration_failed', message: error.message }))
  process.exitCode = 1
}
