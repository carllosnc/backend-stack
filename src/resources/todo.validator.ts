import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { todos } from "./todo.schema";
import { z } from "zod";

export const selectTodoSchema = createSelectSchema(todos);

export const insertTodoSchema = createInsertSchema(todos, {
  title: (schema) => schema.min(1).max(255),
}).omit({
  id: true,
  createdAt: true,
});

export const updateTodoSchema = insertTodoSchema.partial();

export type Todo = z.infer<typeof selectTodoSchema>;
export type NewTodo = z.infer<typeof insertTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
