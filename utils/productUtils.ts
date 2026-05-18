import { products } from "@/constants/saleProducts";
import { Sale } from "@/db/schema";

export function formatMoney(
  value: number,
  locale = "pt-BR",
  currency = "BRL",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatCpf(value: string) {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function getTotalMoneyFromSales(sales: Sale[]) {
  const saleMap = sales.reduce<{ productId: number; amount: number }[]>(
    (acc, sale) => {
      const existing = acc.find((item) => item.productId === sale.productId);

      if (existing) {
        existing.amount += sale.amount;
      } else {
        acc.push({ productId: sale.productId, amount: sale.amount });
      }

      return acc;
    },
    [],
  );
  let totalMoney = 0;
  products.forEach((product) => {
    const findSale = saleMap.find((sale) => sale.productId === product.id);
    if (findSale) {
      totalMoney += product.value * findSale.amount;
    }
  });

  return totalMoney;
}

export function isValidCPF(cpf: string): boolean {
  const cleanedCPF = cpf.replace(/\D/g, "");

  if (cleanedCPF.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleanedCPF)) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(cleanedCPF[i]) * (10 - i);
  }

  let firstDigit = (sum * 10) % 11;

  if (firstDigit === 10) {
    firstDigit = 0;
  }

  if (firstDigit !== Number(cleanedCPF[9])) {
    return false;
  }

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(cleanedCPF[i]) * (11 - i);
  }

  let secondDigit = (sum * 10) % 11;

  if (secondDigit === 10) {
    secondDigit = 0;
  }

  if (secondDigit !== Number(cleanedCPF[10])) {
    return false;
  }

  return true;
}
