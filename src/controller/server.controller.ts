import { Request, Response } from 'express'

/**
 * @description Endpoint to check that the server is running.
 */
export function checkHealthController(_: Request, res: Response) {
  return res.status(200).json({ message: 'Pong!' })
}
