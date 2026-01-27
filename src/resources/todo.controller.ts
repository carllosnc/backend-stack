import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { todoRepository } from "./todo.repository";
import {
  insertTodoSchema,
  updateTodoSchema,
  selectTodoSchema,
} from "./todo.validator";

const todoController = new OpenAPIHono();

// Schema for error responses
const ErrorSchema = z.object({
  error: z.string(),
});

// Schema for success response
const SuccessSchema = z.object({
  success: z.boolean(),
});

// Schema for ID parameter
const IdParamSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

// Get all todos
const getAllTodosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["todos"],
  summary: "Get all todos",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(selectTodoSchema),
        },
      },
      description: "List of all todos",
    },
  },
});

todoController.openapi(getAllTodosRoute, async (c) => {
  const todos = await todoRepository.findAll();
  return c.json(todos);
});

// Get todo by ID
const getTodoByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["todos"],
  summary: "Get a todo by ID",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: selectTodoSchema,
        },
      },
      description: "Todo found",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Todo not found",
    },
  },
});

todoController.openapi(getTodoByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const todo = await todoRepository.findById(id);
  
  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  
  return c.json(todo, 200);
});

// Create todo
const createTodoRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["todos"],
  summary: "Create a new todo",
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertTodoSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: selectTodoSchema,
        },
      },
      description: "Todo created successfully",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Failed to create todo",
    },
  },
});

todoController.openapi(createTodoRoute, async (c) => {
  const data = c.req.valid("json");
  
  try {
    const todo = await todoRepository.create(data);
    return c.json(todo, 201);
  } catch (error) {
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

// Update todo
const updateTodoRoute = createRoute({
  method: "patch",
  path: "/{id}",
  tags: ["todos"],
  summary: "Update a todo",
  request: {
    params: IdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateTodoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: selectTodoSchema,
        },
      },
      description: "Todo updated successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Todo not found",
    },
  },
});

todoController.openapi(updateTodoRoute, async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  
  const todo = await todoRepository.update(id, data);
  
  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  
  return c.json(todo, 200);
});

// Delete todo
const deleteTodoRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["todos"],
  summary: "Delete a todo",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessSchema,
        },
      },
      description: "Todo deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Todo not found",
    },
  },
});

todoController.openapi(deleteTodoRoute, async (c) => {
  const { id } = c.req.valid("param");
  
  const deleted = await todoRepository.delete(id);
  
  if (!deleted) {
    return c.json({ error: "Todo not found" }, 404);
  }
  
  return c.json({ success: true }, 200);
});

export { todoController };
