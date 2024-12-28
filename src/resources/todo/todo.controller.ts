import { drizzle } from 'drizzle-orm/libsql';
import { todoTable } from '../../db/todo-schema'
import { bodyValidator, idValidator } from './todo.schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import type { Bindings } from '../../bindings'
import { describeGetAllTodos, describeAddOneTodo } from './todo.doc'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', describeGetAllTodos, async (c) => {
  const db = drizzle({ connection: {
    url: c.env.TURSO_DATABASE_URL!,
    authToken: c.env.TURSO_AUTH_TOKEN!
  }});

  const todos = await db.select().from(todoTable)

  c.status(200)

  return c.json(todos)
})

app.post('/', bodyValidator, describeAddOneTodo, async (c) => {
  const db = drizzle({ connection: {
    url: c.env.TURSO_DATABASE_URL!,
    authToken: c.env.TURSO_AUTH_TOKEN!
  }});

  const { title } = c.req.valid('json')
  const todo: typeof todoTable.$inferInsert = { title }

  const result = await db.insert(todoTable).values(todo).returning()

  c.status(201)

  return c.json(result)
})

app.delete('/:id', idValidator, async (c) => {
  const db = drizzle({ connection: {
    url: c.env.TURSO_DATABASE_URL!,
    authToken: c.env.TURSO_AUTH_TOKEN!
  }});

  const { id } = c.req.valid('param')
  await db.delete(todoTable).where(eq(todoTable.id, id))

  c.status(200)

  return c.json({ message: `Todo ${id} deleted` })
})

export default app
