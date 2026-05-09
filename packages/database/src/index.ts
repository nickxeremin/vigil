import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

export function createDatabase(url: string) {
  const client = postgres(url)
  return drizzle(client, { schema })
}

export type Database = PostgresJsDatabase<typeof schema>

export * from "./schema"
export { schema }
