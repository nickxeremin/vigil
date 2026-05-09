import React from "react"
import { redirect } from "next/navigation"

import { SessionProvider } from "@/features/auth"
import { authQueries } from "@/features/auth/api/auth.queries"
import { getQueryClient } from "@/shared/lib/get-query-client"

interface AuthenicatedLayoutProps {
  children: React.ReactNode
}

export default async function AuthenicatedLayout({
  children,
}: AuthenicatedLayoutProps) {
  const queryClient = getQueryClient()
  const { data } = await queryClient.fetchQuery(authQueries.session())

  if (!data) {
    redirect("/login")
  }

  return <SessionProvider value={data}>{children}</SessionProvider>
}
