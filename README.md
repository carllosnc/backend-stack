# CWORKER

What's inside?

- Bun
- Turso
- Cloudflare Workers
- Drizzle ORM
- Hono
- Zod
- Drizzle

## Installation

Before start install **Bun** and **Turso**

- Bun: [how to install](https://bun.sh/docs/installation)
- Turso: [how to install](https://turso.tech/docs/installation)

## Settings

Create a `.env` file in the root of the project with the following variables:

User `.evn.example` as a template: `cp .env.example .env`.

```sh
TURSO_DATABASE_URL="..."
TURSO_AUTH_TOKEN="..."
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