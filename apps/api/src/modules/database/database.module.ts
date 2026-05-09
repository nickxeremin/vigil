import { Global, Module } from "@nestjs/common"
import { createDatabase } from "@vigil/database"

import { env } from "@/common/config/env"

import { DRIZZLE } from "./database.constants"

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => createDatabase(env.DATABASE_URL),
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
