import { Colors } from "@/constants/colors";
import { getAllSales } from "@/db/sales";
import { Sale } from "@/db/schema";
import { useUserStore } from "@/stores/userStore";
import { formatMoney, getTotalMoneyFromSales } from "@/utils/productUtils";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenBackground from "../components/ScreenBackground";

type SellerRanking = {
  sellerId: string;
  sellerName: string;
  totalMoney: number;
  saleCount: number;
};

export default function Ranking() {
  const { allUser } = useUserStore();
  const [allSales, setAllSales] = useState<Sale[]>([]);

  async function fetchSales() {
    const sales = await getAllSales();
    setAllSales(sales);
  }

  useEffect(() => {
    fetchSales();
  }, []);

  const ranking = useMemo(() => {
    const sellerMap = new Map<string, Sale[]>();

    for (const sale of allSales) {
      const existing = sellerMap.get(sale.sellerId);
      if (existing) {
        existing.push(sale);
      } else {
        sellerMap.set(sale.sellerId, [sale]);
      }
    }

    const result: SellerRanking[] = [];

    for (const [sellerId, sales] of sellerMap) {
      const user = allUser.find((u) => u.id === sellerId);
      result.push({
        sellerId,
        sellerName: user?.username ?? sellerId,
        totalMoney: getTotalMoneyFromSales(sales),
        saleCount: sales.length,
      });
    }

    return result.sort((a, b) => b.totalMoney - a.totalMoney);
  }, [allSales, allUser]);

  return (
    <ScreenBackground headerColor={Colors.dark} bodyColor={Colors.lightGray}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ranking de Vendedores</Text>
        <Text style={styles.headerSubTitle}>
          Comparação de desempenho entre vendedores
        </Text>
      </View>

      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={styles.listContent}
      >
        {ranking.length === 0 && (
          <Text style={styles.emptyText}>Nenhum vendedor encontrado</Text>
        )}

        {ranking.map((seller, index) => {
          const position = index + 1;
          return (
            <View key={seller.sellerId} style={styles.card}>
              <View style={styles.positionRow}>
                <View
                  style={[
                    styles.positionBadge,
                    position === 1 && styles.goldBadge,
                    position === 2 && styles.silverBadge,
                    position === 3 && styles.bronzeBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.positionText,
                      position === 1 && styles.goldText,
                      position === 2 && styles.silverText,
                      position === 3 && styles.bronzeText,
                    ]}
                  >
                    {position}º
                  </Text>
                </View>
                <View style={styles.sellerInfo}>
                  <Text style={styles.sellerName}>{seller.sellerName}</Text>
                  <Text style={styles.saleCount}>
                    {seller.saleCount} venda{seller.saleCount !== 1 ? "s" : ""}
                  </Text>
                </View>
                <Text style={styles.moneyText}>
                  {formatMoney(seller.totalMoney)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    marginBottom: 12,
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
  scrollStyle: {
    width: "100%",
  },
  listContent: {
    paddingBottom: 24,
    gap: 8,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  positionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  positionBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  goldBadge: {
    backgroundColor: "#FFF3CD",
  },
  silverBadge: {
    backgroundColor: "#E8E8E8",
  },
  bronzeBadge: {
    backgroundColor: "#FFE0CC",
  },
  positionText: {
    fontWeight: "700",
    fontSize: 14,
    color: Colors.darkGray,
  },
  goldText: {
    color: "#B8860B",
  },
  silverText: {
    color: "#717171",
  },
  bronzeText: {
    color: "#8B4513",
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontWeight: "600",
    fontSize: 16,
    color: Colors.black,
  },
  saleCount: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginTop: 2,
  },
  moneyText: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.secondary,
  },
  emptyText: {
    textAlign: "center",
    color: Colors.mediumGray,
    marginTop: 40,
    fontSize: 14,
  },
});
