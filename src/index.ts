import { Hono } from 'hono'
import todo from './resources/todo/todo.controller'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello World!' })
})

app.route('/todos', todo)

export default app
