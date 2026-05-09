import { AuthErrors, CommonErrors, OrgErrors } from "./errors"

export * from "./api-error"
export * from "./errors"

export type ErrorEntry =
  | (typeof AuthErrors)[keyof typeof AuthErrors]
  | (typeof OrgErrors)[keyof typeof OrgErrors]
  | (typeof CommonErrors)[keyof typeof CommonErrors]

export type ErrorCode = ErrorEntry["code"]
