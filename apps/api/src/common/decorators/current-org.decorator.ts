import { createParamDecorator, ExecutionContext } from "@nestjs/common"

import { OrgWithMembership } from "@vigil/domain"

import "better-auth"

import { Request } from "express"

export const CurrentOrg = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): OrgWithMembership => {
    const request = ctx.switchToHttp().getRequest<Request>()
    return request.org!
  }
)
