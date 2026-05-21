import { Colors } from "@/constants/colors";
import { getSalesBySeller } from "@/db/sales";
import { Sale } from "@/db/schema";
import { useUserStore } from "@/stores/userStore";
import { getTotalMoneyFromSales } from "@/utils/productUtils";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SaleCard from "../components/SaleCard";
import ScreenBackground from "../components/ScreenBackground";

export default function History() {
  const { user } = useUserStore();
  const [userSaler, setUserSales] = useState<Sale[]>([]);
  const totalSales = useMemo(
    () => getTotalMoneyFromSales(userSaler),
    [userSaler],
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

  return (
    <ScreenBackground headerColor={Colors.infoDark} bodyColor={Colors.infoWhiteWish}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Histórico de Vendas</Text>
          <Text style={styles.headerSubTitle}>Todas as vendas registradas</Text>
        </View>
      </View>

      <View style={styles.card}>
        
      </View>
      <Text style={styles.cardText}>Vendas Recentes</Text>
      {userSaler.slice(-2).map((sale) => (
        <SaleCard sale={sale} key={sale.id} />
      ))}
     
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  iconRow: {
    flexDirection: "row",
    gap: 4,
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: 20,
    color: Colors.white,
  },
  headerSubTitle: {
    fontWeight: 400,
    fontSize: 16,
    color: Colors.white,
  },
  iconBox: {
    alignItems: "center",
    aspectRatio: 1,
    width: 30,
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  card: {
    elevation: 3,
    backgroundColor: Colors.white,
    width: "100%",
    padding: 8,
    borderRadius: 8,
    gap: 18,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    color: Colors.mediumGray,
    fontWeight: "400",
    fontSize: 14,
  },
  moneyText: {
    color: Colors.secondary,
    fontWeight: "700",
    fontSize: 30,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 8,
    marginTop: "auto",
  },
});
