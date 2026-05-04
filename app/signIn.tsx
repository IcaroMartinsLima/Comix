import { Colors } from "@/constants/colors";
import { useUserStore } from "@/stores/userStore";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
    Button,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function signIn() {
  const { user, allUser, addUser } = useUserStore();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (user) router.replace("/(tabs)/HomeScreen");
  }, [user]);
  const validUserInput = useCallback(() => {
    const isValidEmail = (email: string) => {
      return /\S+@\S+\.\S+/.test(email);
    };
    if (userName.trim().length === 0) {
      console.log("Nome invalido");
      return;
    }
    if (userEmail.trim().length === 0 || !isValidEmail(userEmail)) {
      console.log("Email invalido");
      return;
    }
    if (userPassword.trim().length === 0) {
      console.log("Senha invalida");
      return;
    }
    createAcount(userName, userEmail, userPassword);
  }, [userName, userEmail, userPassword]);
  function createAcount(
    userName: string,
    userEmail: string,
    userPassword: string,
  ) {
    const emailExist = allUser.some((u) => u.email === userEmail);
    if (emailExist) {
      console.log("Email já cadastrado");
    } else {
      addUser({
        email: userEmail.toLowerCase().trim(),
        password: userPassword.trim(),
        username: userName.trim(),
        id: uuidv4(),
      });
      router.replace("..");
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
        <Text style={styles.subTitle}>Crie sua conta</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="account"
              size={20}
              color={Colors.secondary}
            />
            <Text>Nome</Text>
          </View>

          <TextInput
            style={styles.input}
            textContentType="name"
            value={userName}
            onChangeText={setUserName}

          />
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="email"
              size={20}
              color={Colors.secondary}
            />
            <Text>E-mail</Text>
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
    gap: 8,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
