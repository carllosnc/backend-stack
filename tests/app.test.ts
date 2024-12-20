import { expect, test, describe } from 'bun:test'
import app from '../src/index'

describe('App suite', () => {
  test('Check hello world', async () => {
    const res = await app.request('/')
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual({ message: 'Hello World!' })
  })
})
