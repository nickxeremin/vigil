import { redirect } from "next/navigation"

import { OrgProvider } from "@/features/org"
import { orgQueries } from "@/features/org/api/org.queries"
import { getQueryClient } from "@/shared/lib/get-query-client"

interface OrgLayoutProps {
  children: React.ReactNode
}

export default async function OrgLayout({ children }: OrgLayoutProps) {
  const queryClient = getQueryClient()
  const { data: org } = await queryClient.fetchQuery(orgQueries.active())

  if (!org) {
    redirect("/onboarding")
  }

  return <OrgProvider value={{ org }}>{children}</OrgProvider>
}
