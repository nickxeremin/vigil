export const OrgErrors = {
  ORG_NOT_FOUND: { code: "ORG_NOT_FOUND", status: 404 },

  ORG_SLUG_TAKEN: { code: "ORG_SLUG_TAKEN", status: 409 },

  ORG_MEMBER_NOT_FOUND: { code: "ORG_MEMBER_NOT_FOUND", status: 404 },

  ORG_ALREADY_MEMBER: { code: "ORG_ALREADY_MEMBER", status: 409 },

  ORG_INVITE_INVALID: { code: "ORG_INVITE_INVALID", status: 400 },

  ORG_INVITE_EXPIRED: { code: "ORG_INVITE_EXPIRED", status: 410 },

  ORG_INSUFFICIENT_ROLE: { code: "ORG_INSUFFICIENT_ROLE", status: 403 },

  ORG_CANNOT_REMOVE_OWNER: { code: "ORG_CANNOT_REMOVE_OWNER", status: 422 },
} as const
