import { Inject } from "@nestjs/common"

import { type Database } from "@vigil/database"

import { DRIZZLE } from "./database.constants"

export abstract class BaseRepository {
  constructor(@Inject(DRIZZLE) protected readonly db: Database) {}
}
