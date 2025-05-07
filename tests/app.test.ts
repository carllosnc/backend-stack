import { expect, test, describe } from 'bun:test'
import app from '../src/index'

describe('App suite', () => {
  test('Check documentation route', async () => {
    const res = await app.request('/docs')

    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/html; charset=UTF-8')
  })

  test('Check openapi schema', async () => {
    const res = await app.request('/docs/openapi ')

    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('application/json')
  })
})
