import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  email: text("email").unique().notNull(),
  year_of_study: integer("year_of_study")
})
