import { expect, test, describe } from 'bun:test'
import app from '../../index'
import { faker } from '@faker-js/faker'

const MOCK_ENV = {
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL
}

describe('/todos', () => {
  test('Should get all todos', async () => {
    const res = await app.request('/todos', {}, MOCK_ENV)

    expect(res.status).toBe(200)
  })

  test('Should create a new todo', async () => {
    const res = await app.request('/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: faker.word.words(5),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, MOCK_ENV)

    expect(res.status).toBe(201)
  })
})


