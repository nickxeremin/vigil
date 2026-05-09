import { ErrorCode, ErrorEntry } from "."

export type ApiErrorOptions = {
  message?: string
  cause?: unknown
  meta?: Record<string, unknown>
}

export class ApiError extends Error {
  readonly code: ErrorCode
  readonly status: number
  readonly meta?: Record<string, unknown>

  constructor(entry: ErrorEntry, options?: ApiErrorOptions) {
    // Если сообщение не передано, используем код как сообщение
    super(options?.message ?? entry.code, options)

    this.name = "ApiError"
    this.code = entry.code
    this.status = entry.status
    this.meta = options?.meta

    // Восстанавливаем цепочку прототипов
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function isErrorCode<T extends ErrorEntry>(
  error: unknown,
  entry: T
): error is ApiError & { code: T["code"] } {
  return isApiError(error) && error.code === entry.code
}
