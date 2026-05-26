import { db } from "@/app/_layout";
import { eq } from "drizzle-orm";
import { sales, type NewSale, type Sale } from "./schema";

export async function createSale(data: NewSale): Promise<Sale> {
  const [sale] = await db.insert(sales).values(data).returning();
  return sale;
}

export async function getAllSales(): Promise<Sale[]> {
  return db.select().from(sales);
}

export async function getSalesBySeller(sellerId: string): Promise<Sale[]> {
  return db.select().from(sales).where(eq(sales.sellerId, sellerId));
}
