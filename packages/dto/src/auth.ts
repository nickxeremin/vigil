import z from "zod"

export const requestOtpDtoSchema = z.object({
  email: z.email(),
})
export type RequestOtpDto = z.infer<typeof requestOtpDtoSchema>

export const verifyOtpDtoSchema = z.object({
  email: z.email(),
  code: z.string().length(6),
})
export type VerifyOtpDto = z.infer<typeof verifyOtpDtoSchema>
