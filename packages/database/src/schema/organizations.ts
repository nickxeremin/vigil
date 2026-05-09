import { pgTable } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"

export const organizations = pgTable("organizations", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  slug: t.varchar("slug", { length: 255 }).notNull().unique(),
  logo: t.text("logo"),
  metadata: t.text("metadata"),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull(),
})
