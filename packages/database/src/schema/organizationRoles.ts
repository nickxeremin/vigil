import { pgTable } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"

import { organizations } from "./organizations"

export const organizationRoles = pgTable("organization_roles", {
  id: t.text("id").primaryKey(),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  role: t.text("role").notNull(),
  permission: t.text("permission").notNull(),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull(),
  updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }),
})
