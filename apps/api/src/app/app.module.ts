import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { AuthModule } from "@thallesp/nestjs-better-auth"

import { BETTER_AUTH } from "@/modules/auth/auth.constants"
import { Auth } from "@/modules/auth/auth.instance"
import { AuthProvider } from "@/modules/auth/auth.provider"
import { DatabaseModule } from "@/modules/database/database.module"

@Module({
  imports: [
    AuthModule.forRootAsync({
      inject: [BETTER_AUTH],
      useFactory: (auth: Auth) => ({
        auth,
        bodyParser: {
          json: { limit: "2mb" },
          urlencoded: { limit: "2mb", extended: true },
          rawBody: true,
        },
      }),
    }),
    DatabaseModule,
  ],
  providers: [AuthProvider],
})
export class AppModule {}
