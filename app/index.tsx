import { Colors } from "@/constants/colors";
import { useUserStore } from "@/stores/userStore";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Toast } from "toastify-react-native";

import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function index() {
  const { user, setUser, allUser } = useUserStore();
  const [userEmail, setUserEmail] = useState(user?.email ?? "");
  const [userPassword, setUserPassword] = useState(user?.password ?? "");
  const validUserInput = useCallback(() => {
    if (userEmail.trim().length === 0) {
      Toast.warn("Preencha o email");
      return;
    }
    if (userPassword.trim().length === 0) {
      Toast.warn("Preencha a senha");
      return;
    }
    login(userEmail, userPassword);
  }, [userEmail, userPassword]);
  function login(userEmail: string, userPassword: string) {
    const newUser = allUser.find(
      (u) =>
        u.email.trim() === userEmail.trim() &&
        u.password.trim() === userPassword.trim(),
    );
    if (newUser) {
      setUser(newUser);
      Toast.success("Login realizado com sucesso");
      router.replace({ pathname: "/(tabs)/homeScreen" });
    } else {
      Toast.error("Usuário não encontrado");
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
            <Text>Email</Text>
          </View>

          <TextInput
            style={styles.input}
            textContentType="emailAddress"
            value={userEmail}
            onChangeText={setUserEmail}
            autoCapitalize="none"
          />

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="lock"
              size={20}
              color={Colors.secondary}
            />
            <Text>Senha</Text>
          </View>
          <TextInput
            style={styles.input}
            textContentType="password"
            caretHidden
            secureTextEntry
            value={userPassword}
            onChangeText={setUserPassword}
          />
          <Button
            title="Entrar"
            color={Colors.secondary}
            onPress={validUserInput}
          ></Button>
          <TouchableOpacity onPress={() => router.push("/signIn")}>
            <Text>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderRadius: 999,
    backgroundColor: Colors.white,
    elevation: 3,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    width: "80%",
    gap: 8,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
