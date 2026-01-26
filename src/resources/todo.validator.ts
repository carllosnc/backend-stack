import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { todos } from "./todo.schema";
import { z } from "zod";

export const selectTodoSchema = createSelectSchema(todos);

export const insertTodoSchema = createInsertSchema(todos, {
  title: (schema) =>
    schema
      .min(1, "Title is required")
      .max(255, "Title must be 255 characters or less"),
}).omit({
  id: true,
  createdAt: true,
});

export const updateTodoSchema = insertTodoSchema.partial();

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID").transform(Number),
});

export type Todo = z.infer<typeof selectTodoSchema>;
export type NewTodo = z.infer<typeof insertTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
