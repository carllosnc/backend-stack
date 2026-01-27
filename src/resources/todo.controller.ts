import { OpenAPIHono } from "@hono/zod-openapi";
import { todoRepository } from "./todo.repository";
import {
  getAllTodosRoute,
  getTodoByIdRoute,
  createTodoRoute,
  updateTodoRoute,
  deleteTodoRoute,
} from "./todo.orcp";

const todoController = new OpenAPIHono();

// Get all todos
todoController.openapi(getAllTodosRoute, async (c) => {
  const todos = await todoRepository.findAll();
  return c.json(todos);
});

// Get todo by ID
todoController.openapi(getTodoByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const todo = await todoRepository.findById(id);

  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(todo, 200);
});

// Create todo
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
todoController.openapi(deleteTodoRoute, async (c) => {
  const { id } = c.req.valid("param");

  const deleted = await todoRepository.delete(id);

  if (!deleted) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json({ success: true }, 200);
});

export { todoController };
