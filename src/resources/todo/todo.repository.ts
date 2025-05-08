import { drizzle } from 'drizzle-orm/libsql';
import { Context } from 'hono';
import { todoTable } from '@/db/todo-schema'
import { eq } from 'drizzle-orm'

export function dbConnection(c: Context) {
  return drizzle({ connection: {
    url: c.env.TURSO_DATABASE_URL!,
    authToken: c.env.TURSO_AUTH_TOKEN!
  }});
}

export async function getAllTodos(c: Context) {
  const db = dbConnection(c)
  return await db.select().from(todoTable)
}

export async function addOneTodo(
  c: Context,
  todo: typeof todoTable.$inferInsert
) {
  const db = dbConnection(c)
  return await db.insert(todoTable).values(todo).returning()
}

export async function deleteOneTodo(c: Context, id: number) {
  const db = dbConnection(c)
  return await db.delete(todoTable).where(eq(todoTable.id, id))
}
