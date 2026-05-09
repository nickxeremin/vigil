import { ApiError } from "@vigil/errors"

type RequestOptions = RequestInit & {
  params?: Record<string, string>
}

async function request(
  endpoint: string,
  options?: RequestOptions
): Promise<unknown> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)

  if (options?.params) {
    Object.entries(options.params).forEach(([k, v]) =>
      url.searchParams.set(k, v)
    )
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const data = await response.json()

    throw new ApiError(
      { code: data.code, status: data.status },
      { message: data.message, meta: data.meta }
    )
  }

  if (response.status === 204) return undefined

  return response.json()
}

export const apiClient = {
  get: (endpoint: string, options?: RequestOptions) =>
    request(endpoint, { ...options, method: "GET" }),
  post: (endpoint: string, body?: unknown, options?: RequestOptions) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  delete: (endpoint: string, options?: RequestOptions) =>
    request(endpoint, { ...options, method: "DELETE" }),
}
