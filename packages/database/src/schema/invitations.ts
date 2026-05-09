import { pgTable } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"

import { organizations } from "./organizations"
import { users } from "./users"

export const invitations = pgTable("invitations", {
  id: t.text("id").primaryKey(),
  email: t.text("email").notNull(),
  inviterId: t
    .text("inviter_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  role: t.text("role"),
  status: t.text("status").notNull(),
  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull(),
  expiresAt: t
    .timestamp("expires_at", { precision: 6, withTimezone: true })
    .notNull(),
})
