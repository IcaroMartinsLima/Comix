// schema.ts
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sales = sqliteTable('sales', {
  id:            int('id').primaryKey({ autoIncrement: true }),
  sellerId:      int('seller_id').notNull(),
  productId:     int('product_id').notNull(),
  customerCpf:   text('customer_cpf', { length: 11 }).notNull(),
  amount:        real('amount').notNull(),
  paymentMethod: text('payment_method', { enum: ['pix', 'credit_card', 'debit_card', 'cash'] }).notNull(),
  status:        text('status', { enum: ['pending', 'completed', 'cancelled'] }).default('completed'),
  createdAt:     int('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;