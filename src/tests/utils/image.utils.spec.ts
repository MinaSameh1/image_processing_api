import fs from 'fs'
import sharp from 'sharp'
import { getImageMetaData, resizeImage } from '../../utils'

describe('test suite for image utils (uses sharp)', () => {
  // Taken from sharp docs: https://www.npmjs.com/package/sharp
  const meta = { height: 200, width: 200 }
  const testBuf = Buffer.from(
    `<svg><rect x="0" y="0" width="${meta.width}" height="${meta.height}" rx="50" ry="50"/></svg>`
  )
  const imgName = './testImg.jpg'
  beforeAll(async () => {
    process.env.LOG_LEVEL = 'silent' // turn off pino
    await sharp(testBuf).toFile('./testImg.jpg') // Create file
  })

  afterAll(() => {
    if (fs.existsSync(imgName)) {
      fs.unlink('./testImg.jpg', err => {
        // Taken from 'https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback'
        if (err) throw err
      })
    }
    if (fs.existsSync('./testImg2.jpg')) {
      fs.unlink('./testImg2.jpg', err => {
        // Taken from 'https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback'
        if (err) throw err
      })
    }
  })

  it('Should get Image metadata', async () => {
    const Meta = await getImageMetaData(imgName)
    expect(Meta.width).toBe(meta.width)
    expect(Meta.height).toBe(meta.height)
  })

  it('Should Change width and height', async () => {
    // Get original values.
    await resizeImage({
      imageLocation: imgName,
      width: meta.width * 2,
      height: meta.height * 2
    })
    const newMeta = await sharp('./testImg.jpg').metadata()
    expect(newMeta.height).toBeGreaterThan(meta.height)
    expect(newMeta.width).toBeGreaterThan(meta.width)
  })

  it('Should override file if no newlocation is passed', async () => {
    const stats = fs.statSync('./testImg.jpg')
    await resizeImage({
      imageLocation: imgName,
      width: meta.width * 2,
      height: meta.height * 2
    })
    const newStats = fs.statSync('./testImg.jpg')
    expect(newStats.mtime.getTime()).toBeGreaterThan(stats.mtime.getTime())
  })

  it('should create a new file', async () => {
    await resizeImage({
      imageLocation: './testImg.jpg',
      width: 400,
      height: 400,
      newLocation: './testImg2.jpg'
    })
    expect(fs.existsSync('./testImg2.jpg')).toBeTrue()
  })
})
