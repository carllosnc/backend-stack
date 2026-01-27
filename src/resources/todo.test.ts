import { expect, test, describe, beforeAll, afterAll } from "bun:test";
import app from "../index";

describe("Todo API", () => {
  let createdTodoId: number;

  test("POST /api/todos should create a new todo", async () => {
    const res = await app.request("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test Todo" }),
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.title).toBe("Test Todo");
    expect(data.completed).toBe(false);
    expect(data.id).toBeDefined();
    createdTodoId = data.id;
  });

  test("POST /api/todos should return 400 for invalid data", async () => {
    const res = await app.request("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" }), // Invalid: Empty title but min length is 1
    });

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
    expect(Array.isArray(data.errors)).toBe(true);
    expect(data.errors[0].message).toBe("Title is required");
  });

  test("GET /api/todos should return a list of todos", async () => {
    const res = await app.request("/api/todos");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("GET /api/todos/:id should return a specific todo", async () => {
    const res = await app.request(`/api/todos/${createdTodoId}`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.id).toBe(createdTodoId);
    expect(data.title).toBe("Test Todo");
  });

  test("PATCH /api/todos/:id should update a todo", async () => {
    const res = await app.request(`/api/todos/${createdTodoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.completed).toBe(true);
  });

  test("DELETE /api/todos/:id should delete a todo", async () => {
    const res = await app.request(`/api/todos/${createdTodoId}`, {
      method: "DELETE",
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);

    // Verify it's gone
    const checkRes = await app.request(`/api/todos/${createdTodoId}`);
    expect(checkRes.status).toBe(404);
  });
});
