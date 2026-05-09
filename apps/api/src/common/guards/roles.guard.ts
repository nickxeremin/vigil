import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"

import { OrgRole, ROLE_HIERARCHY } from "@vigil/domain"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<OrgRole[]>("roles", [
      ctx.getHandler(),
      ctx.getClass(),
    ])

    // No @Roles() means any member can
    if (!requiredRoles?.length) return true

    const req = ctx.switchToHttp().getRequest<Request>()
    const { role } = req.org! // Must be after OrgMemberGuard

    return (
      ROLE_HIERARCHY[role] >=
      Math.min(...requiredRoles.map((r) => ROLE_HIERARCHY[r]))
    )
  }
}
