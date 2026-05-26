import { Colors } from "@/constants/colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getSalesBySeller } from "@/db/sales";
import { Sale } from "@/db/schema";
import { useUserStore } from "@/stores/userStore";
import { getTotalMoneyFromSales } from "@/utils/productUtils";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SaleCard from "../components/SaleCard";
import ScreenBackground from "../components/ScreenBackground";

export default function History() {
  const theme = useThemeColors();
  const { user } = useUserStore();
  const [userSales, setUserSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState("");

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          width: "100%",
          marginBottom: 12,
        },
        scrollStyle: {
          width: "100%",
          height: "100%",
        },
        headerTitle: {
          fontWeight: "700",
          fontSize: 20,
          color: Colors.white,
        },
        headerSubTitle: {
          fontWeight: "400",
          fontSize: 14,
          color: Colors.white,
          marginTop: 2,
        },
        searchBox: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.white,
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 8,
          width: "100%",
          marginBottom: 12,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        },
        searchIcon: {
          marginRight: 8,
        },
        searchInput: {
          flex: 1,
          fontSize: 14,
          color: theme.black,
        },
        metricsRow: {
          flexDirection: "row",
          gap: 10,
          width: "100%",
          marginBottom: 12,
        },
        metricCard: {
          flex: 1,
          backgroundColor: theme.white,
          borderRadius: 10,
          padding: 14,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        },
        metricLabel: {
          fontSize: 13,
          color: theme.mediumGray,
          fontWeight: "400",
          marginBottom: 6,
        },
        metricValueBlue: {
          fontSize: 26,
          fontWeight: "700",
          color: theme.infoDark,
        },
        metricValueGreen: {
          fontSize: 20,
          fontWeight: "700",
          color: theme.secondary,
        },
        listContent: {
          paddingBottom: 24,
          gap: 0,
        },
        emptyText: {
          textAlign: "center",
          color: theme.mediumGray,
          marginTop: 40,
          fontSize: 14,
        },
      }),
    [theme],
  );

  async function getSales() {
    if (user) {
      const newUserSales = await getSalesBySeller(user?.id);
      setUserSales(
        newUserSales.sort(
          (a, b) =>
            (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
        ),
      );
    }
  }

  useEffect(() => {
    getSales();
  }, [user]);

  const filteredSales = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return userSales;
    return userSales.filter((sale) => {
      const productId = String(sale.productId);
      const customerCpf = sale.customerCpf.toLowerCase();
      return productId.includes(q) || customerCpf.includes(q);
    });
  }, [userSales, search]);

  const totalSales = filteredSales.length;
  const totalMoney = useMemo(
    () => getTotalMoneyFromSales(filteredSales),
    [filteredSales],
  );

  return (
    <ScreenBackground
      headerColor={theme.infoDark}
      bodyColor={theme.infoWhiteWish}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico de Vendas</Text>
        <Text style={styles.headerSubTitle}>Todas as vendas registradas</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={18}
          color={theme.mediumGray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por produto ou CPF do cliente..."
          placeholderTextColor={theme.mediumGray}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total de Vendas</Text>
          <Text style={styles.metricValueBlue}>{totalSales}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Valor Total</Text>
          <Text style={styles.metricValueGreen}>
            {totalMoney.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollStyle} contentContainerStyle={{ gap: 8 }}>
        {filteredSales.slice(-8).map((sale) => (
          <SaleCard
            sale={sale}
            key={sale.id}
            style={{ marginVertical: 0, marginHorizontal: 0 }}
          />
        ))}
      </ScrollView>
    </ScreenBackground>
  );
}
