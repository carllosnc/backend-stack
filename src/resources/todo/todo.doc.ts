import { describeRoute } from "hono-openapi";
import { resolver } from 'hono-openapi/zod'
import { todoTable } from '@/db/todo-schema'
import { createSelectSchema } from 'drizzle-zod';
import  { z } from 'zod';

const defaultTodo = {
  id: 1,
  title: 'Example',
  completed: true,
  created_at: new Date().toISOString()
}

export const describeGetAllTodos = describeRoute({
  description: 'Get all todos',
  responses: {
    200: {
      description: 'All todos',
      content: {
        'text/plain': {
          schema: resolver(
            z.array(
              createSelectSchema(todoTable).default(defaultTodo)
            )
          ),
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
          schema: resolver(
            createSelectSchema(todoTable).default(defaultTodo)
          ),
        },
      },
    },
  },
})

export const describeDeleteOneTodo = describeRoute({
  description: 'Delete a todo',
  responses: {
    204: {
      description: 'Todo deleted',
      content:{
        'text/plain': {
          schema: resolver(
            z.object({
              message: z.string().default('Todo 1 deleted')
            })
          ),
        }
      }
    },
  },
})