import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common"
import { and, eq } from "drizzle-orm"
import { Request } from "express"

import { members, organizations, type Database } from "@vigil/database"
import { orgWithMembershipSchema } from "@vigil/domain"
import { ApiError, CommonErrors, OrgErrors } from "@vigil/errors"

import { DRIZZLE } from "@/modules/database/database.constants"

@Injectable()
export class OrgMemberGuard implements CanActivate {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>()
    const user = req.user! // Must be after AuthGuard

    const slug =
      req.params.slug || req.params.orgSlug || req.headers["x-org-slug"]

    if (!slug) {
      throw new ApiError(CommonErrors.BAD_REQUEST, {
        message: "Org slug required",
      })
    }

    const result = await this.db
      .select({
        org: organizations,
        membership: members,
      })
      .from(organizations)
      .innerJoin(
        members,
        and(
          eq(members.organizationId, organizations.id),
          eq(members.userId, user.id)
        )
      )
      .where(eq(organizations.slug, slug as string))
      .limit(1)

    if (!result.length) {
      throw new ApiError(OrgErrors.ORG_MEMBER_NOT_FOUND, {
        message: "Not a member of this organization",
      })
    }

    // Кладём в request — достанем через @CurrentOrg()
    const orgWithMembership = orgWithMembershipSchema.parse({
      ...result[0]?.org,
      memberId: result[0]?.membership.id,
      role: result[0]?.membership.role,
    })

    req.org = orgWithMembership

    return true
  }
}
