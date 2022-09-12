import Router from 'express'
import { checkHealthController } from '../controller'
import { SERVER_ENDPOINT } from '../utils'

export const serverRouter = Router()

serverRouter.get(SERVER_ENDPOINT + '/checkhealth', checkHealthController)
