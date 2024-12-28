import { describeRoute } from "hono-openapi";
import { resolver } from 'hono-openapi/zod'
import { todoTable } from '../../db/todo-schema'
import { createSelectSchema } from 'drizzle-zod';

export const describeGetAllTodos = describeRoute({
  description: 'Get all todos',
  responses: {
    200: {
      description: 'All todos',
      content: {
        'text/plain': {
          schema: resolver(createSelectSchema(todoTable)),
        },
      },
    },
  },
})

export const describeAddOneTodo = describeRoute({
  description: 'Add a todo',
  validateResponse: true,
  responses: {
    201: {
      description: 'Todo created',
      content: {
        'text/plain': {
          schema: resolver(createSelectSchema(todoTable)),
        },
      },
    },
  },
})