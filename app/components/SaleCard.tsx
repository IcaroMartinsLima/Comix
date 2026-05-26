import { useThemeColors } from "@/hooks/useThemeColors";
import { products } from "@/constants/saleProducts";
import { Sale } from "@/db/schema";
import { formatCpf, formatMoney } from "@/utils/productUtils";
import { useMemo } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type SaleCardProps = {
  sale: Sale;
  style?: StyleProp<ViewStyle>;
};

export default function SaleCard({ sale, style }: SaleCardProps) {
  const theme = useThemeColors();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.white,
          borderRadius: 8,
          padding: 16,
          marginVertical: 6,
          marginHorizontal: 16,
          width: "100%",
          elevation: 2,
        },
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 4,
        },
        productName: {
          fontSize: 16,
          fontWeight: "600",
          color: theme.black,
        },
        value: {
          fontSize: 16,
          fontWeight: "700",
          color: theme.secondary,
        },
        cpf: {
          fontSize: 13,
          color: theme.mediumGray,
          marginBottom: 8,
        },
        divider: {
          height: 1,
          backgroundColor: theme.lightGray,
          marginBottom: 8,
        },
        date: {
          fontSize: 13,
          color: theme.mediumGray,
        },
      }),
    [theme],
  );

  const saleProduct = products.find((value) => value.id === sale.productId);
  if (!saleProduct) return null;

  const formattedValue = formatMoney(saleProduct.value * sale.amount);

  const formattedCpf = formatCpf(sale.customerCpf);

  const formattedDate = sale.createdAt
    ? new Intl.DateTimeFormat("pt-BR").format(new Date(sale.createdAt))
    : "";

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <Text style={styles.productName}>{saleProduct.name}</Text>
        <Text style={styles.value}>{formattedValue}</Text>
      </View>
      <Text style={styles.cpf}>CPF: {formattedCpf}</Text>
      <View style={styles.divider} />
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
}
