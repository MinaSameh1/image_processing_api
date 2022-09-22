import { NextFunction, Request, Response } from 'express'

/**
 * @description Middleware to verify Query is within parameters.
 * @param {Request} req - The express Request.
 * @param {Response} res - The express Response.
 * @param {NextFunction} next - Continue to the next point which is error.
 */
export function checkQuery(req: Request, res: Response, next: NextFunction) {
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json({
      message:
        'must supply filename, Ex: `/api/img?filename=img.jpg&width=150&height=100`, bad query!',
      error: true
    })
  }
  if (req.query.filename) {
    const height = req.query.height
    const width = req.query.width
    if (
      height &&
      (isNaN(Number(height)) || Number(height) < 0 || Number(height) > 2000)
    ) {
      return res.status(400).json({
        message: 'Wrong input to height! Must be a number between 1 and 2000',
        error: true
      })
    }
    if (
      width &&
      (isNaN(Number(width)) || Number(width) < 0 || Number(width) > 2000)
    ) {
      return res.status(400).json({
        message: 'Wrong input to width! Must be a number between 1 and 2000',
        error: true
      })
    }
    return next()
  }
  return res.status(400).json({
    message: 'Missing `filename` in query, Must be supplied',
    error: true
  })
}
