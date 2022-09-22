import express from 'express'
import { API_MAIN } from '../utils'
import { ImageController } from '../controller'
import { checkQuery } from '../middleware'

export const imageRouter = express.Router()

imageRouter.get(`${API_MAIN}/img`, checkQuery, ImageController)
