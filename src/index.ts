import { Hono } from 'hono'
import { showRoutes } from 'hono/dev'
import todo from './resources/todo/todo.controller'
import { betterAuthSettings } from './auth'

const app = new Hono()

app.get('/', (c) => c.json({ message: 'Hello World!' }))
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  const auth = betterAuthSettings(
    process.env.TURSO_DATABASE_URL!,
    process.env.TURSO_AUTH_TOKEN!
  )

  return auth.handler(c.req.raw)
});

app.route('/todos', todo)

showRoutes(app, {
  verbose: true,
})

export default app
