import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { checkIfFileExists, getAbsolutePath, resizeImage } from '../utils'

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
    if (req.params.imgName || req.query.fileName) {
      const name = req.params.imgName || req.query.fileName?.toString()
      const imgLoc = getAbsolutePath(req.params.imgName) // Image Location
      const extName = path.extname(imgLoc) // extenstion Name
      if (checkIfFileExists(imgLoc)) {
        // Check if there are queries or not
        if (Object.keys(req.query).length !== 0) {
          req.log.debug(
            `Recieved: ${req.params.imgName} and ${JSON.stringify(req.query)}`
          )
          // Correct queries? or wrong request?
          if (!req.query.h || !req.query.w)
            return res.status(400).json({
              message:
                'h for height and w for width, must supply both, Ex: `img?w=150&h=100` bad query params!',
              error: true
            })
          const imgNameMod = `${name?.split('.')[0]}-${req.query.w}-${
            req.query.h
          }${extName}`
          const imgModLoc = getAbsolutePath(`/modified/${imgNameMod}`)
          if (!checkIfFileExists(imgModLoc))
            // If the img doesn't exist create it.
            await resizeImage({
              imageLocation: imgLoc,
              width: Number(req.query.w),
              height: Number(req.query.h),
              newLocation: imgModLoc
            })
          // There is no need for else, because one of two things will happen,
          // Either the image exists then send it, or error occurs (try catch)
          return res.sendFile(imgModLoc)
        }
        // Just return the image since there is no query.
        return res.sendFile(imgLoc)
      }
    }
    return res.status(404).json({ message: 'Image Not found!' })
  } catch (err: unknown) {
    req.log.error(err)
    next(err)
  }
}
