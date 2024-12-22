import 'dotenv/config';
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/libsql';
import { account, user, verification, session } from './db/auth-schema';
import { origins } from './settings/origins'

export function betterAuthSettings(tursoUrl: string, tursoToken: string) {
  const db = drizzle({ connection: {
    url: tursoUrl,
    authToken: tursoToken
  }})

  return betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    trustedOrigins: [
      ...origins
    ],
    database: drizzleAdapter(db, {
      schema: {
        account,
        user,
        verification,
        session
      },
      provider: "sqlite", // or "pg" or "mysql"
    })
  })
}

