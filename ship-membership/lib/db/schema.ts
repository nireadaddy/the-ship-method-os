import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id:                      text("id").primaryKey(), // Clerk user ID
  email:                   text("email").notNull().unique(),
  name:                    text("name"),
  avatarUrl:               text("avatar_url"),
  plan:                    text("plan").notNull().default("free"),
  stripeCustomerId:        text("stripe_customer_id").unique(),
  stripeSubscriptionId:    text("stripe_subscription_id").unique(),
  stripePriceId:           text("stripe_price_id"),
  stripeCurrentPeriodEnd:  timestamp("stripe_current_period_end"),
  cancelAtPeriodEnd:       text("cancel_at_period_end").default("false"),
  createdAt:               timestamp("created_at").defaultNow().notNull(),
  updatedAt:               timestamp("updated_at").defaultNow().notNull(),
});

export const contentAccess = pgTable("content_access", {
  id:           text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId:       text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  contentSlug:  text("content_slug").notNull(),
  accessedAt:   timestamp("accessed_at").defaultNow().notNull(),
});

export type User    = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
