import z from "zod"

const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.url().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>
