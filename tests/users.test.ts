import { expect, test, describe } from 'bun:test'
import app from '../src/index'
import { faker } from '@faker-js/faker'

const MOCK_ENV = {
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL
}

describe('/users', () => {
  test('Should get all users', async () => {
    const res = await app.request('/users', {}, MOCK_ENV)
    expect(res.status).toBe(200)
  })

  test('Should create a new user', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 80 }),
        email: faker.internet.email(),
        address: faker.location.streetAddress()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, MOCK_ENV)
    expect(res.status).toBe(201)
  })
})


