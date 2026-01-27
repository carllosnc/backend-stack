import { createRoute, z } from "@hono/zod-openapi";
import {
  insertTodoSchema,
  updateTodoSchema,
  selectTodoSchema,
} from "./todo.validator";

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
export const getAllTodosRoute = createRoute({
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

// Get todo by ID
export const getTodoByIdRoute = createRoute({
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

// Create todo
export const createTodoRoute = createRoute({
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

// Update todo
export const updateTodoRoute = createRoute({
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

// Delete todo
export const deleteTodoRoute = createRoute({
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
