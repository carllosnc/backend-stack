# CWORKER

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

**.env**
```sh
TURSO_DATABASE_URL="..."
TURSO_AUTH_TOKEN="..."
```

**.dev.vars**
```sh
TURSO_DATABASE_URL="..."
TURSO_AUTH_TOKEN="..."
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="..."
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

Running the migrations:
```sh
bun run migrate
```

Generating the schema:
```sh
bun run generate
```

---

Carlos Costa @ 2024