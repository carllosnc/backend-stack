import { expect, test, describe } from 'bun:test'
import app from '@/index'

const MOCK_ENV = {
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL
}

describe('/todos', () => {
  test('Should get all todos', async () => {
    const res = await app.request('/res/v1/todos', {}, MOCK_ENV)

    expect(res.status).toBe(401)
  })
})


