import { integer, sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const todoTable = sqliteTable("todos", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text(),
  completed: integer({ mode: "boolean" }).default(false),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
});