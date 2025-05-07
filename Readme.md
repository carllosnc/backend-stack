# Backend stack

>this project is a tiny boiler for create my own backend projects

**What's inside?**

- [Bun](https://bun.sh/) as package management
- [Cloudflare Workers](https://workers.cloudflare.com/) as serverless platform
- [Turso Database](https://turso.tech/) as serverless database
- [Drizzle ORM](https://orm.drizzle.team/)
- [Hono](https://hono.dev/)
- [Zod](https://zod.dev/)
- [Better Auth](https://github.com/betterauth/betterauth)

## Installation

Before start install **Bun** and **Turso**

- Bun: [how to install](https://bun.sh/docs/installation)
- Turso: [how to install](https://turso.tech/docs/installation)

## Settings

Create a `.dev.vars` file in the root of the project with the following variables:

**.dev.vars**

```sh
APP_URL=

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

## Client Authentication

This is the basic configuration to authenticate with the backend.

```ts
import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    jwtClient()
  ],
  baseURL: process.env.BACKEND_URL,
})

export const signIn = async () => {
  const data = await authClient.signIn.social({
      callbackURL: process.env.CALLBACK_URL,
      provider: "google"
  })

  console.log(data)
}
```

## Resources

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
