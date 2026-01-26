import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { origins } from './config/origins'
import { limiter } from './config/rate-limit'
import { todoController } from './resources/todo.controller'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

app.use('*', limiter)

app.use(
  '/api/*',
  cors({
    origin: origins,
  })
)

app.get('/', (c) => {
  return c.json({
    message: 'Backend Stack',
    author: 'Carlos Costa',
    version: '1.0.0',
  })
})

app.post(
  '/api/users',
  zValidator(
    'json',
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
    })
  ),
  (c) => {
    const { name, email } = c.req.valid('json')
    return c.json({
      success: true,
      data: { name, email },
    }, 201)
  }
)

app.route('/api/todos', todoController)

export default app
