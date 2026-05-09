import z from "zod"

//   id: t.text("id").primaryKey(),
//   userId: t
//     .text("user_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   activeOrganizationId: t.text("active_organization_id"),
//   token: t.varchar("token", { length: 255 }).notNull().unique(),
//   expiresAt: t
//     .timestamp("expires_at", { precision: 6, withTimezone: true })
//     .notNull(),
//   ipAddress: t.text("ip_address"),
//   userAgent: t.text("user_agent"),
//   createdAt: t
//     .timestamp("created_at", { precision: 6, withTimezone: true })
//     .notNull(),
//   updatedAt: t
//     .timestamp("updated_at", { precision: 6, withTimezone: true })
//     .notNull(),

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  activeOrganizationId: z.string().nullish(),
  token: z.string(),
  ipAddress: z.string().nullish(),
  userAgent: z.string().nullish(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Session = z.infer<typeof sessionSchema>
