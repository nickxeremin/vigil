import { OrgWithMembership, User } from "@vigil/domain"

declare global {
  namespace Express {
    interface Request {
      user?: User
      org?: OrgWithMembership
    }
  }
}
