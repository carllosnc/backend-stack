# Backend stack

What's inside?

- Bun
- Turso Database
- Cloudflare Workers
- Drizzle ORM
- Hono
- Zod
- Drizzle
- Better Auth

## Installation

Before start install **Bun** and **Turso**

- Bun: [how to install](https://bun.sh/docs/installation)
- Turso: [how to install](https://turso.tech/docs/installation)

## Settings

Create a `.env` and a `.dev.vars` file in the root of the project with the following variables:

**.dev.vars**

```sh
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

## Development

Running the server:
```sh
bun run dev
```

Running database server:
```sh
turso dev
```

Running the tests:
```sh
bun test
```

Applying database migrations:
```sh
bun run --env-file=.dev.vars migrate
```

Generating database schema:
```sh
bun run generate
```

Open drizzle studio:
```sh
bun run --env-file=.dev.vars studio
```

# Resources

Basic structure for resources.

```
📂 resources
|― 📂 todo
   |― 📄 todo.controller.ts
   |― 📄 todo.doc.ts
   |― 📄 todo.validator.ts
   |― 📄 todo.test.ts
```

- **controller** - verbs and actions
- **doc** - documentation for openapi
- **validator** - validation schemas
- **test** - unitary tests

---

Carlos Costa @ 2024
