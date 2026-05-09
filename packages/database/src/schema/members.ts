import { pgTable } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"

import { organizations } from "./organizations"
import { users } from "./users"

export const members = pgTable("members", {
  id: t.text("id").primaryKey(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  role: t.text("role").notNull(),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull(),
})
