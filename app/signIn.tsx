import { Colors } from "@/constants/colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useUserStore } from "@/stores/userStore";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Toast } from "toastify-react-native";
import { v4 as uuidv4 } from "uuid";

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

export default function signIn() {
  const theme = useThemeColors();
  const { allUser, addUser, setUser } = useUserStore();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.secondary,
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
          backgroundColor: theme.white,
          borderRadius: 8,
          padding: 12,
          elevation: 3,
          width: "80%",
          gap: 8,
        },
        input: {
          backgroundColor: theme.lightGray,
          borderRadius: 4,
          paddingVertical: 2,
          paddingHorizontal: 4,
        },
        label: {
          color: theme.black,
        },
      }),
    [theme],
  );

  const validUserInput = useCallback(() => {
    const isValidEmail = (email: string) => {
      return /\S+@\S+\.\S+/.test(email);
    };
    if (userName.trim().length === 0) {
      Toast.warn("Preencha o nome");
      return;
    }
    if (userEmail.trim().length === 0 || !isValidEmail(userEmail)) {
      Toast.warn("Informe um email válido");
      return;
    }
    if (userPassword.trim().length === 0) {
      Toast.warn("Preencha a senha");
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
      Toast.error("Email já cadastrado");
    } else {
      const newUser = {
        email: userEmail.toLowerCase().trim(),
        password: userPassword.trim(),
        username: userName.trim(),
        id: uuidv4(),
      };

      addUser(newUser);
      setUser(newUser);
      Toast.success("Cadastro realizado com sucesso");
      router.replace({ pathname: "/(tabs)/homeScreen" });
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.icon}>
          <Feather name="shopping-bag" size={32} color={theme.secondary} />
        </View>
        <Text style={styles.title}>Portal de vendas</Text>
        <Text style={styles.subTitle}>Crie sua conta</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="account"
              size={20}
              color={theme.secondary}
            />
            <Text style={styles.label}>Nome</Text>
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
              color={theme.secondary}
            />
            <Text style={styles.label}>E-mail</Text>
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
              color={theme.secondary}
            />
            <Text style={styles.label}>Senha</Text>
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
            title="Cadastrar"
            color={theme.secondary}
            onPress={validUserInput}
          />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.label}>Já tem conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
