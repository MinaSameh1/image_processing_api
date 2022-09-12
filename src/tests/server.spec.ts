import request from 'supertest'
import app from '../server'

describe('server should work', () => {
  beforeAll(() => {
    process.env.LOG_LEVEL = 'silent' // Turn off pino
  })

  it('should ping back', async () => {
    const data = await request(app).get('/api/checkhealth')
    expect(data.statusCode).toEqual(200)
    expect(data.body.message).toBeDefined()
  })
})
