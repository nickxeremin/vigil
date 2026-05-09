import { Provider } from "@nestjs/common"

import { Database } from "@vigil/database"

import { DRIZZLE } from "../database/database.constants"
import { BETTER_AUTH } from "./auth.constants"
import { createAuthInstance } from "./auth.instance"

export const AuthProvider: Provider = {
  provide: BETTER_AUTH,
  inject: [DRIZZLE],
  useFactory: (db: Database) => createAuthInstance(db),
}
