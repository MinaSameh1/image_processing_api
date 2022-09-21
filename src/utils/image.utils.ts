import sharp from 'sharp'

export interface resizeInput {
  imageLocation: string
  width: number
  height: number
  newLocation?: string
}

/**
 * @description Resizes images using sharp.
 * @param {resizeInput} Obj - Consists of
 * {
 *  imageLocation: string - The location of the image we want to resize
 *  width: number - The width
 *  height: number - The height
 *  newLocation?: string - The new location, if not passed then it replaces the old image
 * }
 */
export async function resizeImage({
  imageLocation,
  width,
  height,
  newLocation
}: resizeInput) {
  const imageMeta = await sharp(imageLocation).metadata()
  if (newLocation)
    return sharp(imageLocation)
      .resize(
        width === 0 ? imageMeta.width : width,
        height === 0 ? imageMeta.height : height
      )
      .toFile(newLocation)
  // First save it to a buffer
  const buffer = await sharp(imageLocation)
    .resize(
      width === 0 ? imageMeta.width : width,
      height === 0 ? imageMeta.height : height
    )
    .toBuffer()
  // then to file, as sharp cannot handle the input to be the same as output,
  // so we have to split them.
  return sharp(buffer).toFile(imageLocation)
}

export default resizeImage
