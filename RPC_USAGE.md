# RPC Client Usage

This project now supports Hono's RPC feature with full OpenAPI documentation.

## Features

- ✅ **OpenAPI Documentation**: Available at `http://localhost:3000/api/doc`
- ✅ **Swagger UI**: Interactive API documentation at `http://localhost:3000/api/ui`
- ✅ **Type-Safe RPC Client**: Use Hono's RPC client for type-safe API calls

## Using the RPC Client

### Installation (Frontend/Client)

```bash
bun add hono
```

### Example Usage

```typescript
import { hc } from 'hono/client'
import type { AppType } from './src/index'

// Create a type-safe client
const client = hc<AppType>('http://localhost:3000')

// Get all todos (fully typed)
const res = await client.api.todos.$get()
const todos = await res.json()

// Get a specific todo
const todoRes = await client.api.todos[':id'].$get({
  param: { id: '1' }
})
const todo = await todoRes.json()

// Create a new todo
const createRes = await client.api.todos.$post({
  json: {
    title: 'New Todo',
    completed: false
  }
})
const newTodo = await createRes.json()

// Update a todo
const updateRes = await client.api.todos[':id'].$patch({
  param: { id: '1' },
  json: {
    completed: true
  }
})
const updatedTodo = await updateRes.json()

// Delete a todo
const deleteRes = await client.api.todos[':id'].$delete({
  param: { id: '1' }
})
const result = await deleteRes.json()
```

## Benefits

1. **Full Type Safety**: TypeScript will autocomplete all routes and validate request/response types
2. **OpenAPI Spec**: Automatically generated from your route definitions
3. **Interactive Documentation**: Test your API directly from the browser at `/api/ui`
4. **No Code Generation**: Types are inferred directly from your backend code

## Accessing Documentation

- **OpenAPI JSON**: http://localhost:3000/api/doc
- **Swagger UI**: http://localhost:3000/api/ui

## Testing the API

You can test the API using the Swagger UI or with curl:

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create a todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","completed":false}'

# Get a specific todo
curl http://localhost:3000/api/todos/1

# Update a todo
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:3000/api/todos/1
```
