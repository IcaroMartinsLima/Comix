import { Colors } from "@/constants/colors";
import { formatMoney } from "@/utils/productUtils";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenBackground from "./components/ScreenBackground";

type SalesRecordProps = {};

export default function SalesRecord({}: SalesRecordProps) {
  const { name, value } = useLocalSearchParams<{
    name: string;
    value: string;
  }>();
  const numberValue = Number(value);
  const [cpf, setCpf] = useState("");
  return (
    <ScreenBackground useBackAction bodyColor={Colors.lightGreen}>
      <Text style={styles.title}>Registro de venda</Text>
      <Text style={styles.subTitle}>Preencha os dados da venda</Text>
      <View style={styles.card}>
        <View
          style={{
            backgroundColor: Colors.lightGreen,
            aspectRatio: 1,
            padding: 8,
            borderRadius: "50%",
            width: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="shopping-bag" size={18} color={Colors.secondary} />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text>Produto Selecionado</Text>
          <Text>{name}</Text>
          <Text>{formatMoney(numberValue)} /un.</Text>
        </View>

        <Text>{formatMoney(numberValue)}</Text>
      </View>
      <View style={[styles.card, { flexDirection: "column" }]}>
        <View style={{ gap: 8, flexDirection: "row", width: "100%" }}>
          <Feather name="shopping-bag" size={18} color={Colors.secondary} />
          <Text>Quantidade</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={[styles.touchStyle, { backgroundColor: Colors.gray }]}
          >
            <Feather name="minus" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.number}>1</Text>
          <TouchableOpacity
            style={[styles.touchStyle, { backgroundColor: Colors.secondary }]}
          >
            <Feather name="plus" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="account"
            size={20}
            color={Colors.secondary}
          />
          <Text>CPF do Cliente</Text>
        </View>

        <TextInput
          style={styles.input}
          textContentType="name"
          value={cpf}
          onChangeText={setCpf}
          placeholder="000.000.000-00"
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.white,
    alignSelf: "flex-start",
  },
  subTitle: {
    fontWeight: "400",
    fontSize: 10,
    color: Colors.white,
    alignSelf: "flex-start",
  },
  card: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: Colors.white,
    elevation: 3,
    borderRadius: 8,
    width: "100%",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  touchStyle: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    aspectRatio: 1,
  },
  number: {
    fontWeight: "700",
    fontSize: 24,
    color: Colors.dark,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
});
