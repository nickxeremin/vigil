export const AuthErrors = {
  AUTH_UNAUTHORIZED: {
    code: "AUTH_UNAUTHORIZED",
    status: 401,
  },

  AUTH_INVALID_CREDENTIALS: {
    code: "AUTH_INVALID_CREDENTIALS",
    status: 401,
  },

  AUTH_INVALID_OTP_CODE: {
    code: "AUTH_INVALID_OTP_CODE",
    status: 400,
  },

  AUTH_OTP_CODE_EXPIRED: {
    code: "AUTH_OTP_CODE_EXPIRED",
    status: 410,
  },

  AUTH_TOO_MANY_REQUESTS: {
    code: "AUTH_TOO_MANY_REQUESTS",
    status: 429,
  },

  AUTH_FORBIDDEN: {
    code: "AUTH_FORBIDDEN",
    status: 403,
  },
} as const
