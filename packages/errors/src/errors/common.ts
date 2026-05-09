export const CommonErrors = {
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    status: 500,
  },
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    status: 400,
  },
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    status: 400,
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    status: 404,
  },
  CONFLICT: {
    code: "CONFLICT",
    status: 409,
  },
} as const
