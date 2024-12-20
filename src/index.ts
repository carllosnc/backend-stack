import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/libsql';
import { usersTable } from './db/schema'
import { userValidator, userIdValidator } from './validators/user.validators'
import { eq } from 'drizzle-orm'

type Bindings = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.json({ message: 'Hello World!' })
})

app.get('/users', async (c) => {
  const db = drizzle({ connection: {
    url: c.env.TURSO_DATABASE_URL!,
    authToken: c.env.TURSO_AUTH_TOKEN!
  }});

  const users = await db.select().from(usersTable)

  c.status(200)

  return c.json(users)
})

app.post('/users', userValidator, async (c) => {
  const db = drizzle({ connection: {
    url: c.env.TURSO_DATABASE_URL!,
    authToken: c.env.TURSO_AUTH_TOKEN!
  }});

  const { name, age, email } = c.req.valid('json')

  const user: typeof usersTable.$inferInsert = { name, age, email }
  await db.insert(usersTable).values([user])
  const createUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))

  c.status(201)

  return c.json(createUser)
})

app.delete('/users/:id', userIdValidator, async (c) => {
  const db = drizzle({ connection: {
    url: c.env.TURSO_DATABASE_URL!,
    authToken: c.env.TURSO_AUTH_TOKEN!
  }});

  const { id } = c.req.valid('param')

  await db.delete(usersTable).where(eq(usersTable.id, id))

  c.status(200)

  return c.json({ message: `User ${id} deleted` })
})

export default app
