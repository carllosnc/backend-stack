import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { origins } from './config/origins'
import { limiter } from './config/rate-limit'
import { todoController } from './resources/todo.controller'

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

app.route('/api/todos', todoController)

export default app
