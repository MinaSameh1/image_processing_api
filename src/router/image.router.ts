import express from 'express'
import { API_MAIN } from '../utils'
import { ImageController } from '../controller'

export const imageRouter = express.Router()

imageRouter.get(`${API_MAIN}/img/:imgName`, ImageController)
imageRouter.get(`${API_MAIN}/img/`, ImageController)
