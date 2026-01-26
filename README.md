# Backend Stack

[![CI](https://github.com/carllosnc/backend-stack/actions/workflows/ci.yml/badge.svg)](https://github.com/carllosnc/backend-stack/actions/workflows/ci.yml)

A modern, high-performance backend template built with **Bun**, **Hono**, **Drizzle ORM**, and **SQLite**.

## Features

- **Runtime**: [Bun](https://bun.sh/) for lightning-fast execution.
- **Framework**: [Hono](https://hono.dev/) - ultra-fast web framework.
- **Database**: [SQLite](https://bun.sh/docs/api/sqlite) via `bun:sqlite` for local development.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) for type-safe database interactions.
- **Validation**: [Zod](https://zod.dev/) for robust request body and schema validation.
- **Security**:
  - Configurable **CORS** middleware.
  - **Rate Limiting** to prevent abuse.
- **Testing**: Integrated **Bun Test** suite with integration tests for all resources.

## Tech Stack

- **Hono** (Routing & Middleware)
- **Bun SQLite** (Native SQLite Driver)
- **Drizzle ORM** (Database Tooling)
- **Zod** (Validation)
- **Hono Rate Limiter** (Protection)

## Getting Started

### Prerequisites

You need [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository
2. Install dependencies:
   ```sh
   bun install
   ```
3. Initialize the database:
   ```sh
   bun db:push
   ```

### Running the App

```sh
bun run dev
```
The server will start at `http://localhost:3000`.

## Testing

Run the integration test suite:
```sh
bun test
```

## Project Structure

- `src/config/`: Configuration for CORS and Rate Limiting.
- `src/db/`: Database connection and main schema.
- `src/resources/`: Feature-based resources (Schema, Repository, Controller, Validator, and Tests).
- `src/tests/`: Global integration tests.

## Architecture and Resource Pattern

This project follows a modular, resource-based architecture. Each feature (like `Todo`) is self-contained within the `src/resources` directory, making the codebase easy to scale and maintain.

### Resource Structure

Each resource typically consists of the following files:

- **`[resource].schema.ts`**: Defines the database table using Drizzle ORM.
- **`[resource].validator.ts`**: Contains Zod schemas for request validation (Insert, Update) and type definitions.
- **`[resource].repository.ts`**: Encapsulates all database queries and data logic.
- **`[resource].controller.ts`**: Defines the Hono routes and handles HTTP requests/responses.
- **`[resource].test.ts`**: Integrated tests for the resource's endpoints.

### Why this pattern?

1. **Separation of Concerns**: Database logic is isolated from HTTP handling.
2. **Type Safety**: TypeScript types are shared across the repository and controller, ensuring end-to-end type safety.
3. **Testability**: Each resource can be tested in isolation with its own test suite.
4. **Consistency**: New features can be added by following this predictable blueprint.

### Example: Todo Resource

The `Todo` resource serves as a reference implementation:
- **Schema**: Defines the `todos` table with fields like `title` and `completed`.
- **Validation**: Uses `drizzle-zod` to automatically generate validation schemas from the table definition, adding custom refinements where needed.
- **Repository**: Provides a clean interface for CRUD operations, abstracting the Drizzle queries.
- **Controller**: Exposes RESTful endpoints and uses the `zValidator` middleware to ensure all incoming data is valid before reaching the repository.

## API Endpoints

### General
- `GET /`: Basic author and project info.

### Todos
- `GET /api/todos`: List all todos.
- `GET /api/todos/:id`: Get a specific todo.
- `POST /api/todos`: Create a new todo.
- `PATCH /api/todos/:id`: Update a todo.
- `DELETE /api/todos/:id`: Delete a todo.

## Scripts

- `bun dev`: Run development server with hot reload.
- `bun test`: Run all tests.
- `bun db:generate`: Generate migration files.
- `bun db:migrate`: Apply migrations to the database.
- `bun db:push`: Push local schema changes directly to the database (recommended for dev).
- `bun db:studio`: Launch Drizzle Studio to explore your data.

---
Built by Carlos Costa.
