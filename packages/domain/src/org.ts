import z from "zod"

export const orgRoleSchema = z.enum(["owner", "admin", "member"])
export type OrgRole = z.infer<typeof orgRoleSchema>

export const ROLE_HIERARCHY: Record<OrgRole, number> = {
  owner: 3,
  admin: 2,
  member: 1,
}

export function hasRequiredRole(
  userRole: OrgRole,
  requiredRole: OrgRole
): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

export const orgSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50),
  logo: z.url().nullish(),
  createdAt: z.coerce.date(),
})
export type Org = z.infer<typeof orgSchema>

export const orgWithMembershipSchema = orgSchema.extend({
  role: orgRoleSchema,
  memberId: z.string(),
})
export type OrgWithMembership = z.infer<typeof orgWithMembershipSchema>
