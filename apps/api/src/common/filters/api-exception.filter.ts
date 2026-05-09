import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common"
import z, { ZodError } from "zod"

import { ApiError, ErrorCode, ErrorEntry } from "@vigil/errors"

const HTTP_STATUS_TO_ENTRY: Record<number, ErrorEntry> = {
  400: { code: "VALIDATION_ERROR", status: 400 },
  401: { code: "AUTH_UNAUTHORIZED", status: 401 },
  403: { code: "AUTH_FORBIDDEN", status: 403 },
  404: { code: "NOT_FOUND", status: 404 },
  409: { code: "CONFLICT", status: 409 },
  429: { code: "AUTH_TOO_MANY_REQUESTS", status: 429 },
  500: { code: "INTERNAL_SERVER_ERROR", status: 500 },
}

const FALLBACK_ENTRY: ErrorEntry = {
  code: "INTERNAL_SERVER_ERROR",
  status: 500,
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const errorResponse = this.resolve(exception)

    if (errorResponse.status >= 500) {
      this.logger.error({
        path: request.url,
        exception,
      })
    }

    response.status(errorResponse.status).json({
      code: errorResponse.code,
      message: errorResponse.message,
      meta: this.shouldExposeMeta(errorResponse)
        ? errorResponse.meta
        : undefined,
    })
  }

  private resolve(exception: unknown): ApiError {
    if (exception instanceof ApiError) {
      return exception
    }

    if (exception instanceof ZodError) {
      return new ApiError(
        { code: "VALIDATION_ERROR", status: HttpStatus.BAD_REQUEST },
        {
          message: "Validation failed",
          meta: {
            issues: exception.issues,
            fields: z.treeifyError(exception),
          },
        }
      )
    }

    if (exception instanceof HttpException) {
      const entry =
        HTTP_STATUS_TO_ENTRY[exception.getStatus()] ?? FALLBACK_ENTRY
      return new ApiError(entry, { message: exception.message })
    }

    return new ApiError(
      {
        code: "INTERNAL_SERVER_ERROR",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      { message: "Something went wrong" }
    )
  }

  private shouldExposeMeta(error: ApiError): boolean {
    // Validation meta всегда нужна фронту
    if (error.code === "VALIDATION_ERROR") return true
    // Остальное только в dev
    return process.env.NODE_ENV === "development"
  }
}
