import { bodyValidator, idValidator } from './todo.validator'
import { Hono } from 'hono'
import type { Bindings } from '../../bindings'
import {
  describeGetAllTodos,
  describeAddOneTodo,
  describeDeleteOneTodo
} from './todo.doc'
import {
  getAllTodos,
  addOneTodo,
  deleteOneTodo
} from './todo.repository'

const todos = new Hono<{ Bindings: Bindings }>()

todos.get('/', describeGetAllTodos, async (c) => {
  const todos = await getAllTodos(c)

  c.status(200)
  return c.json(todos)
})

todos.post('/', bodyValidator, describeAddOneTodo, async (c) => {
  const { title } = c.req.valid('json')
  const result = await addOneTodo(c, { title })

  c.status(201)
  return c.json(result)
})

todos.delete('/:id', idValidator, describeDeleteOneTodo, async (c) => {
  const { id } = c.req.valid('param')
  await deleteOneTodo(c, id)

  c.status(200)
  return c.json({ message: `Todo ${id} deleted` })
})

export default todos
