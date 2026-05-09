import { queryOptions } from "@tanstack/react-query"

import { orgApi } from "./org.api"

export const orgKeys = {
  all: ["orgs"] as const,
  active: () => [...orgKeys.all, "active"] as const,
  details: () => [...orgKeys.all, "detail"] as const,
  detail: (id: string) => [...orgKeys.details(), id] as const,
}

export const orgQueries = {
  active: () =>
    queryOptions({
      queryKey: orgKeys.active(),
      queryFn: () => orgApi.getActiveOrg(),
      staleTime: 1000 * 60 * 5, // 5 min
    }),
}
