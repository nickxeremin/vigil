import * as dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const envSchema = z.object({
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),

  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),

  PORT: z.coerce.number().default(3001),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  APP_URL: z.url(),
})

export const env = envSchema.parse(process.env)
