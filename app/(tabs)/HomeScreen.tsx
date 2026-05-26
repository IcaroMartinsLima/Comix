import { Colors } from "@/constants/colors";
import { getSalesBySeller } from "@/db/sales";
import { Sale } from "@/db/schema";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useUserStore } from "@/stores/userStore";
import { formatMoney, getTotalMoneyFromSales } from "@/utils/productUtils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SaleCard from "../components/SaleCard";
import ScreenBackground from "../components/ScreenBackground";

export default function HomeScreen() {
  const theme = useThemeColors();
  const { user, setUser } = useUserStore();
  const [userSaler, setUserSales] = useState<Sale[]>([]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          fontWeight: "700",
          fontSize: 20,
          color: Colors.white,
        },
        headerSubTitle: {
          fontWeight: "400",
          fontSize: 16,
          color: Colors.white,
        },
        iconBox: {
          alignItems: "center",
          aspectRatio: 1,
          width: 30,
          borderRadius: 30,
          justifyContent: "center",
          backgroundColor: theme.primary,
        },
        card: {
          elevation: 3,
          backgroundColor: theme.white,
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
          color: theme.mediumGray,
          fontWeight: "400",
          fontSize: 14,
        },
        moneyText: {
          color: theme.secondary,
          fontWeight: "700",
          fontSize: 30,
        },
        button: {
          width: "100%",
          alignItems: "center",
          backgroundColor: theme.secondary,
          padding: 8,
          borderRadius: 8,
          marginTop: "auto",
        },
      }),
    [theme],
  );

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
    <ScreenBackground>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Portal de Vendas</Text>
          <Text style={styles.headerTitle}>Olá, {user?.username}</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => {
              setUser(null);
              router.replace("/");
            }}
          >
            <MaterialCommunityIcons
              name="exit-to-app"
              size={16}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardText}>Total de Vendas</Text>
        </View>
        <Text style={styles.moneyText}>{formatMoney(totalSales)}</Text>
        <Text style={styles.cardText}>
          {userSaler.length} vendas registradas
        </Text>
      </View>
      <Text style={styles.cardText}>Última venda</Text>
      {userSaler.slice(-1).map((sale) => (
        <SaleCard sale={sale} key={sale.id} />
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create")}
      >
        <Text style={{ fontSize: 18, color: Colors.white }}>+</Text>
      </TouchableOpacity>
    </ScreenBackground>
  );
}
