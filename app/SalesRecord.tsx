import { Colors } from "@/constants/colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { createSale } from "@/db/sales";
import { useUserStore } from "@/stores/userStore";
import { formatMoney, isValidCPF } from "@/utils/productUtils";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Toast } from "toastify-react-native";
import ScreenBackground from "./components/ScreenBackground";

export default function SalesRecord() {
  const theme = useThemeColors();
  const { user } = useUserStore();
  const { name, value, id } = useLocalSearchParams<{
    name: string;
    value: string;
    id: string;
  }>();
  const numberValue = Number(value);
  const [quantity, setQuantity] = useState(1);
  const [cpf, setCpf] = useState("");
  const [showPayScreen, setShowPayScreen] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          backgroundColor: theme.white,
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
          color: theme.black,
        },
        moneyText: {
          fontWeight: "700",
          fontSize: 18,
          color: theme.secondary,
        },
        input: {
          backgroundColor: theme.lightGray,
          borderRadius: 4,
          paddingVertical: 4,
          paddingHorizontal: 6,
          width: "100%",
          color: theme.black,
        },
        row: {
          flexDirection: "row",
          gap: 8,
          width: "100%",
        },
        qrCodeText: {
          fontWeight: "700",
          fontSize: 18,
          color: theme.black,
        },
        qrCodeSubTile: {
          fontWeight: "400",
          fontSize: 12,
          color: theme.darkGray,
        },
        label: {
          color: theme.black,
        },
      }),
    [theme],
  );

  function onPress() {
    if (isValidCPF(cpf)) setShowPayScreen(true);
    else {
      Toast.error("CPF ínvalido");
    }
  }

  function confirmPay() {
    createSale({
      amount: quantity,
      customerCpf: cpf,
      productId: Number(id),
      sellerId: user?.id ?? "",
    })
      .then(() => {
        Toast.success("Pagamento valido!");
        router.navigate("/(tabs)/homeScreen");
      })
      .catch(() => {
        Toast.error("Erro ao confirmar o pagamento");
      });
  }

  return (
    <ScreenBackground useBackAction bodyColor={theme.lightGreen}>
      <Text style={styles.title}>Registro de venda</Text>
      <Text style={styles.subTitle}>Preencha os dados da venda</Text>
      <View style={styles.card}>
        <View
          style={{
            backgroundColor: theme.lightGreen,
            aspectRatio: 1,
            padding: 8,
            borderRadius: 999,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="shopping-bag" size={18} color={theme.secondary} />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.label}>Produto Selecionado</Text>
          <Text style={styles.label}>{name}</Text>
          <Text style={[styles.moneyText, { fontSize: 12 }]}>
            {formatMoney(numberValue)} /un.
          </Text>
        </View>

        <Text style={[styles.moneyText, { fontSize: 12 }]}>
          {formatMoney(numberValue * quantity)}
        </Text>
      </View>
      {showPayScreen ? (
        <View style={[styles.card, { flexDirection: "column" }]}>
          <MaterialCommunityIcons name="qrcode" size={80} color={theme.black} />
          <Text style={styles.qrCodeText}>QR Code de Pagamento</Text>
          <Text style={styles.qrCodeSubTile}>
            Escaneie o código abaixo para realizar o pagamento
          </Text>
          <Text style={styles.moneyText}>
            {formatMoney(numberValue * quantity)}
          </Text>
          <QRCode
            size={160}
            value="https://youtu.be/dQw4w9WgXcQ?si=AXIC1IbmEjNXedwQ"
          />

          <Button
            color={theme.secondary}
            title="Confirmar pagamento"
            onPress={confirmPay}
          />
        </View>
      ) : (
        <View style={[styles.card, { flexDirection: "column" }]}>
          <View style={{ gap: 8, flexDirection: "row", width: "100%" }}>
            <Feather name="shopping-bag" size={18} color={theme.secondary} />
            <Text style={styles.label}>Quantidade</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              disabled={quantity === 1}
              onPress={() => setQuantity((state) => state - 1)}
              style={[styles.touchStyle, { backgroundColor: theme.gray }]}
            >
              <Feather name="minus" size={18} color="black" />
            </TouchableOpacity>
            <Text style={styles.number}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity((state) => state + 1)}
              style={[styles.touchStyle, { backgroundColor: theme.secondary }]}
            >
              <Feather name="plus" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
              <MaterialCommunityIcons
                name="account"
                size={20}
                color={theme.secondary}
              />
              <Text style={styles.label}>CPF do Cliente</Text>
          </View>

          <TextInput
            style={styles.input}
            textContentType="name"
            value={cpf}
            onChangeText={setCpf}
            placeholder="000.000.000-00"
          />
          <View style={{ width: "auto" }}>
            <Button
              color={theme.secondary}
              title="Gerar pagamento"
              onPress={onPress}
            />
          </View>
        </View>
      )}
    </ScreenBackground>
  );
}
