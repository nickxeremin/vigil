"use server"

import { headers } from "next/headers"

import { RequestOtpDto } from "@vigil/dto"

import { authClient } from "@/shared/api/auth.client"

export const authApi = {
  getSession: async () =>
    authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    }),
  requestOtp: async (dto: RequestOtpDto) => {},
}
