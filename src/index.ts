import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { Scalar } from '@scalar/hono-api-reference'
import { origins } from './config/origins'
import { limiter } from './config/rate-limit'
import { todoController } from './resources/todo.controller'
import { prettyJSON } from 'hono/pretty-json'

const app = new OpenAPIHono()

app.use('*', limiter)

app.use(
  '/api/*',
  cors({
    origin: origins,
  })
)

app.use('*', prettyJSON())

app.get('/', (c) => {
  return c.json({
    message: 'Backend Stack',
    author: 'Carlos Costa',
    version: '1.0.0',
  })
})

// Mount todo routes
app.route('/api/todos', todoController)

// OpenAPI documentation endpoint
app.doc('/api/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Backend Stack API',
    description: 'A modern, high-performance backend API built with Bun, Hono, and Drizzle ORM',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
})

// Scalar API Reference endpoint (modern, recommended)
app.get(
  '/api/ui',
  Scalar({
    theme: 'purple',
    spec: {
      url: '/api/doc',
    },
  })
)

export default app
export type AppType = typeof app
