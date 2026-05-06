import { Colors } from "@/constants/colors";
import { useUserStore } from "@/stores/userStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";
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
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="account" size={16} color="black" />
          </View>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={16}
              color="black"
            />
          </View>
        </View>
      </View>
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
    height: 12,
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: Colors.primary,
  },
});
