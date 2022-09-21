import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { checkIfFileExists, getImageAbsolutePath, resizeImage } from '../utils'

/**
 * @description Controller for image, responsible for the image endpoint.
 * @param {Request} req - The express Request.
 * @param {Response} res - The express Response.
 * @param {NextFunction} next - Continue to the next point which is error.
 * @returns {Promise<void | Response<unknown, Record<string, unknown>>>} Returns the Response.
 */
export async function ImageController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<unknown, Record<string, unknown>>> {
  try {
    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({
        message:
          'must supply filename, h, w, Ex: `/api/img?filename=img.jpg&w=150&h=100`, bad query!',
        error: true
      })
    }
    if (req.query.filename) {
      // Did this to ensure its a strting, that doesn't start with " and end with "
      const name = JSON.stringify(req.query.filename).split('"')[1]
      const imgLoc = getImageAbsolutePath(name) // Image Location
      const extName = path.extname(imgLoc) // extenstion Name
      req.log.error(imgLoc)
      if (checkIfFileExists(imgLoc)) {
        req.log.debug(`Recieved: ${name} and ${JSON.stringify(req.query)}`)
        // Correct queries? or wrong request?
        if (req.query.h || req.query.w) {
          const imgNameMod = `${name.split('.')[0]}-${req.query.w}-${
            req.query.h
          }${extName}`
          const imgModLoc = getImageAbsolutePath(`/modified/${imgNameMod}`)
          if (!checkIfFileExists(imgModLoc))
            // If the img doesn't exist create it.
            await resizeImage({
              imageLocation: imgLoc,
              width: Number(req.query.w ?? 0),
              height: Number(req.query.h ?? 0),
              newLocation: imgModLoc
            })
          // There is no need for else, because one of two things will happen,
          // Either the image exists then send it, or error occurs (try catch)
          return res.sendFile(imgModLoc)
        }
        return res.sendFile(imgLoc)
      }
    }
    return res.status(404).json({ message: 'Image Not found!' })
  } catch (err: unknown) {
    req.log.error(err)
    next(err)
  }
}
