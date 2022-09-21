import request from 'supertest'
import app from '../../server'

describe('Main Endpoint', () => {
  beforeAll(() => {
    process.env.LOG_LEVEL = 'silent'
  })

  it('Should return 400 on bad request', async () => {
    await request(app).get('/api/img').expect(400)
  })

  it('Should return 404 on no image found', async () => {
    await request(app).get('/api/img?filename=NOTHING').expect(404)
  })

  it('Should return 200 on img request', async () => {
    await request(app).get('/api/img?filename=img.jpg').expect(200)
  })

  it('Should return 200 on img request with width and height', async () => {
    await request(app)
      .get('/api/img?filename=img.jpg&height=100&width=200')
      .expect(200)
  })

  it('Should return 200 on img request with width only', async () => {
    await request(app).get('/api/img?filename=img.jpg&width=200').expect(200)
  })

  it('Should return 400 on img request with bad width', async () => {
    await request(app).get('/api/img?filename=img.jpg&width=200f').expect(400)
  })
})
