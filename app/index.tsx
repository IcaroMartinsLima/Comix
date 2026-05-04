import { Colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function index() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Feather name="shopping-bag" size={32} color={Colors.secondary} />
      </View>
      <Text style={styles.title}>Portal de vendas</Text>
      <Text style={styles.subTitle}>Faça login para continuar</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="email"
            size={20}
            color={Colors.secondary}
          />
          <Text>Login</Text>
        </View>

        <TextInput style={styles.input} textContentType="emailAddress" />

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="email"
            size={20}
            color={Colors.secondary}
          />
          <Text>Login</Text>
        </View>
        <TextInput
          style={styles.input}
          textContentType="password"
          caretHidden
        />
        <Button title="Entrar" color={Colors.secondary}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    gap: 6,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    color: Colors.white,
  },
  subTitle: {
    fontWeight: "400",
    fontSize: 12,
    color: Colors.white,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    padding: 12,
    borderRadius: "50%",
    backgroundColor: Colors.white,
    elevation: 3,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    width: "80%",
    gap: 4,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
