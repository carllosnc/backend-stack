import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/neon-http';

const app = new Hono()

app.get('/', (c) => {
  const db = drizzle(process.env.DATABASE_URL!);

  return c.text('Hello Hono!')
})

export default app
