import { useUserStore } from "@/stores/userStore";
import { StyleSheet, Text, View } from "react-native";
import ScreenBackground from "../components/ScreenBackground";

export default function HomeScreen() {
  const { user } = useUserStore();
  return (
    <ScreenBackground>
      <View style={styles.header}>
        <View>
          <Text>Portal de Vendas</Text>

          <Text>Olá, {user?.username}</Text>
        </View>
        <View style={styles.iconRow}></View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconRow: {
    flexDirection: "row",
    gap: 4,
  },
});
