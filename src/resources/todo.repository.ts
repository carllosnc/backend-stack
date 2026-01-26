import { db } from "../db";
import { todos } from "./todo.schema";
import { eq } from "drizzle-orm";
import type { NewTodo, UpdateTodo, Todo } from "./todo.validator";

export class TodoRepository {
  async findAll(): Promise<Todo[]> {
    return db.select().from(todos).all();
  }

  async findById(id: number): Promise<Todo | undefined> {
    const [todo] = db.select().from(todos).where(eq(todos.id, id)).all();
    return todo;
  }

  async create(data: NewTodo): Promise<Todo> {
    const [result] = db.insert(todos).values(data).returning().all();
    if (!result) throw new Error("Failed to create todo");
    return result;
  }

  async update(id: number, data: UpdateTodo): Promise<Todo | undefined> {
    const [result] = db
      .update(todos)
      .set(data)
      .where(eq(todos.id, id))
      .returning()
      .all();
    return result;
  }

  async delete(id: number): Promise<boolean> {
    const result = db.delete(todos).where(eq(todos.id, id)).returning().all();
    return result.length > 0;
  }
}

export const todoRepository = new TodoRepository();
