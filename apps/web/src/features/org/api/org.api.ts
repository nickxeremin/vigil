"use server"

import { headers } from "next/headers"

import { authClient } from "@/shared/api/auth.client"

export const orgApi = {
  getActiveOrg: async () =>
    authClient.organization.getFullOrganization({
      fetchOptions: {
        headers: await headers(),
      },
    }),
}
