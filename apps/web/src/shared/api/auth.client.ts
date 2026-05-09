import { createAuthClient } from "better-auth/client"
import { emailOTPClient, organizationClient } from "better-auth/client/plugins"

import { env } from "../lib/env"

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API_URL,
  plugins: [emailOTPClient(), organizationClient()],
})
