import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { emailOTP, organization } from "better-auth/plugins"

import { Database, schema } from "@vigil/database"

import { env } from "@/common/config/env"

export function createAuthInstance(db: Database) {
  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema, usePlural: true }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.APP_URL],
    plugins: [
      organization(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          console.log({ otp, email })
          if (type === "sign-in") {
            // Send the OTP for sign in
          } else if (type === "email-verification") {
            // Send the OTP for email verification
          } else {
            // Send the OTP for password reset
          }
        },
      }),
    ],
  })
}

export type Auth = ReturnType<typeof createAuthInstance>
