import express from 'express'
import 'dotenv/config'
import helmet from 'helmet'
import pinoExpress from 'express-pino-logger'
import cors from 'cors'
import { logger } from './utils'

import { serverRouter, imageRouter } from './router'

const app = express()

app.set('json spaces', 2) // I like the spaces to be 2.

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(helmet()) // Securityapi

app.use(cors())

app.use(pinoExpress({ logger }))

//Routes
app.use(serverRouter) // /api/checkhealth
app.use(imageRouter)

// Error handling, from express official docs: https://expressjs.com/en/guide/error-handling.html
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line no-unused-vars
    _next: express.NextFunction
  ) => {
    req.log.error({
      errorName: err.name,
      message: err.message,
      stack: err.stack || 'no stack defined!'
    })
    return res
      .status(500)
      .json({ message: 'Internal Server Error', Error: true })
  }
)

export default app
