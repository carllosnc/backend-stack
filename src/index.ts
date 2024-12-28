import { Hono } from 'hono'
import todo from './resources/todo/todo.controller'
import { betterAuthSettings } from './auth'
import { Bindings } from './bindings'
import { cors } from "hono/cors";
import { origins } from './settings/origins'
import { openAPISpecs } from 'hono-openapi';
import { apiReference } from '@scalar/hono-api-reference';

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

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono",
        version: "1.0.0",
        description: "ZZ-Back boilerplate",
      },
      servers: [
        {
          url: "http://localhost:8787",
          description: "Local server",
        },
      ],
    },
  })
);

app.get(
  "/docs",
  apiReference({
    theme: "deepSpace",
    spec: {
      url: "/openapi",
    },
  })
);

export default app
