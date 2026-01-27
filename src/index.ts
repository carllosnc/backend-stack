import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { swaggerUI } from '@hono/swagger-ui'
import { origins } from './config/origins'
import { limiter } from './config/rate-limit'
import { todoController } from './resources/todo.controller'

const app = new OpenAPIHono()

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

// Swagger UI endpoint
app.get('/api/ui', swaggerUI({ url: '/api/doc' }))

export default app
export type AppType = typeof app
