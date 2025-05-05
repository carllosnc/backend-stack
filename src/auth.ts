import 'dotenv/config';
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/libsql';
import { account, user, verification, session } from './db/auth-schema';
import { origins } from './settings/origins'

type Props = {
  tursoUrl: string
  tursoToken: string
  authGoogleId: string
  authGoogleSecret: string
}

export function betterAuthSettings(props: Props) {
  const db = drizzle({ connection: {
    url: props.tursoUrl,
    authToken: props.tursoToken,
  }})

  return betterAuth({
    saveSession: true,
    socialProviders: {
      google: {
        prompt: "select_account",
        clientId: props.authGoogleId,
        clientSecret: props.authGoogleSecret,
      },
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
      }
    },
    emailAndPassword: {
      autoSignIn: true,
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

