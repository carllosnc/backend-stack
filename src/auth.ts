import 'dotenv/config';
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/libsql';

export function betterAuthSettings(tursoUrl: string, tursoToken: string) {
  const db = drizzle({ connection: {
    url: tursoUrl,
    authToken: tursoToken
  }})

  return betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite"
    })
  })
}

