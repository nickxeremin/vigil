import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { RequestOtpDto } from "@vigil/dto"

import { authApi } from "./auth.api"

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
}

export const authQueries = {
  session: () =>
    queryOptions({
      queryKey: authKeys.session(),
      queryFn: () => authApi.getSession(),
      staleTime: 1000 * 60 * 5, // 5 min
    }),
}

export function useRequestOtp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: RequestOtpDto) => authApi.requestOtp(dto),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
