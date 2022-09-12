import app from './server'
import { logger } from './utils'

function startServer() {
  const Port = process.env.PORT || 8000
  app.listen(Port, () => {
    logger.info(`API is listening to ${Port}`)
  })
}

startServer()
