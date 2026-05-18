// schema.ts
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sales = sqliteTable("sales", {
  id: int("id").primaryKey({ autoIncrement: true }),
  sellerId: text("seller_id").notNull(),
  productId: int("product_id").notNull(),
  customerCpf: text("customer_cpf", { length: 11 }).notNull(),
  amount: real("amount").notNull(),
  createdAt: int("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
