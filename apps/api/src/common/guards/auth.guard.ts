import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"

import { ApiError, AuthErrors } from "@vigil/errors"

import { BETTER_AUTH } from "@/modules/auth/auth.constants"
import { type AuthInstance } from "@/modules/auth/auth.instance"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(BETTER_AUTH) private auth: AuthInstance,
    private reflector: Reflector
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // @Public() — пропускаем без проверки
    const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
      ctx.getHandler(),
      ctx.getClass(),
    ])
    if (isPublic) return true

    const req = ctx.switchToHttp().getRequest()

    const session = await this.auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      throw new ApiError(AuthErrors.AUTH_UNAUTHORIZED, {
        message: "Not authenticated",
      })
    }

    req.user = session.user
    return true
  }
}
