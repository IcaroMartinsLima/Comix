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

export async function getSaleById(id: number): Promise<Sale | undefined> {
  const [sale] = await db.select().from(sales).where(eq(sales.id, id));
  return sale;
}

export async function getSalesBySeller(sellerId: string): Promise<Sale[]> {
  return db.select().from(sales).where(eq(sales.sellerId, sellerId));
}

export async function getSalesByCustomer(customerCpf: string): Promise<Sale[]> {
  return db.select().from(sales).where(eq(sales.customerCpf, customerCpf));
}

export async function getSalesByProduct(productId: number): Promise<Sale[]> {
  return db.select().from(sales).where(eq(sales.productId, productId));
}

export async function updateSale(
  id: number,
  data: Partial<Omit<NewSale, "id">>,
): Promise<Sale | undefined> {
  const [updated] = await db
    .update(sales)
    .set(data)
    .where(eq(sales.id, id))
    .returning();
  return updated;
}

export async function deleteSale(id: number): Promise<Sale | undefined> {
  const [deleted] = await db.delete(sales).where(eq(sales.id, id)).returning();
  return deleted;
}
