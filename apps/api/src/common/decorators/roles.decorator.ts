import { SetMetadata } from "@nestjs/common"

import { OrgRole } from "@vigil/domain"

export const Roles = (...roles: OrgRole[]) => SetMetadata("roles", roles)
