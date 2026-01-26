import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { todoRepository } from "./todo.repository";
import { insertTodoSchema, updateTodoSchema } from "./todo.validator";

const todoController = new Hono();

todoController.get("/", async (c) => {
  const todos = await todoRepository.findAll();
  return c.json(todos);
});

todoController.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  const todo = await todoRepository.findById(id);
  if (!todo) return c.json({ error: "Todo not found" }, 404);

  return c.json(todo);
});

todoController.post("/", zValidator("json", insertTodoSchema), async (c) => {
  const data = c.req.valid("json");
  try {
    const todo = await todoRepository.create(data);
    return c.json(todo, 201);
  } catch (error) {
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

todoController.patch("/:id", zValidator("json", updateTodoSchema), async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  const data = c.req.valid("json");
  const todo = await todoRepository.update(id, data);
  if (!todo) return c.json({ error: "Todo not found" }, 404);

  return c.json(todo);
});

todoController.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  const deleted = await todoRepository.delete(id);
  if (!deleted) return c.json({ error: "Todo not found" }, 404);

  return c.json({ success: true });
});

export { todoController };
