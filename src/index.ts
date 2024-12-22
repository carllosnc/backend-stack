import { Hono } from 'hono'
import todo from './resources/todo/todo.controller'
import { betterAuthSettings } from './auth'
import { Bindings } from './bindings'
import { cors } from "hono/cors";
import { origins } from './settings/origins'

const app = new Hono<{Bindings: Bindings }>()

app.get('/', (c) => c.json({ message: 'Hello World!' }))

app.use(
	"/api/auth/**", // or replace with "*" to enable cors for all routes
	cors({
		origin: [
			...origins
		],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/**", async (c) => {
  const auth = betterAuthSettings(
    c.env.TURSO_DATABASE_URL,
    c.env.TURSO_AUTH_TOKEN,
  )

  const result = await auth.handler(c.req.raw)

  return result
});

app.route('/todos', todo)

export default app
