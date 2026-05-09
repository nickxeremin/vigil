import z from "zod"

export const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
})

export const env = envSchema.parse(process.env)
