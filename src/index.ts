import { Hono } from 'hono'
import todo from './resources/todo/todo.controller'
import { betterAuthSettings } from './auth'
import { Bindings } from './bindings'
import { cors } from "hono/cors";
import { origins } from './settings/origins'
import { openAPISpecs } from 'hono-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { bearerAuth } from 'hono/bearer-auth'
import { drizzle } from 'drizzle-orm/libsql';
import { account } from './db/auth-schema';
import { eq } from 'drizzle-orm';

const app = new Hono<{Bindings: Bindings }>()

app.get('/', (c) => {
  return c.json({
    app: "Hone stack",
    description: "Hone stack boylerplate",
    url: c.env.APP_URL,
    open_api: `${c.env.APP_URL}/openapi`,
    docs: `${c.env.APP_URL}/docs`,
  })
})

app.use('/todos', bearerAuth({
  verifyToken: async (token, c) => {
    const db = drizzle({ connection: {
      url: c.env.TURSO_DATABASE_URL,
      authToken: c.env.TURSO_AUTH_TOKEN,
    }})

    const accountResult = await db.select().from(account).where(eq(account.idToken, token))

    return token === accountResult[0].idToken
  },
}))

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
  const auth = betterAuthSettings({
    tursoUrl: c.env.TURSO_DATABASE_URL,
    tursoToken: c.env.TURSO_AUTH_TOKEN,
    authGoogleId: c.env.AUTH_GOOGLE_ID,
    authGoogleSecret: c.env.AUTH_GOOGLE_SECRET,
  })

  const result = await auth.handler(c.req.raw)

  return result
});

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono",
        version: "1.0.0",
        description: "Hone stack boylerplate",
      },
      servers: [
        {
          url: process.env.APP_URL as string,
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

/*=========*/
// ROUTES
/*=========*/

app.route('/todos', todo)

export default app
