import { Colors } from "@/constants/colors";
import { useUserStore } from "@/stores/userStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenBackground from "../components/ScreenBackground";

export default function HomeScreen() {
  const { user } = useUserStore();
  console.log({ user });
  return (
    <ScreenBackground>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Portal de Vendas</Text>

          <Text style={styles.headerTitle}>Olá, {user?.username}</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBox}>
            <MaterialCommunityIcons name="account" size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
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
        <Text style={styles.moneyText}>R$ 0,00</Text>
        <Text style={styles.cardText}>0 vendas registradas</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create")}
      >
        <Text style={{ fontSize: 18, color: Colors.white }}>+</Text>
      </TouchableOpacity>
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
    fontWeight: 700,
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
