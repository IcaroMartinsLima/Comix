
import { Colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenBackground from "./components/ScreenBackground";

type SalesRecordProps = {};

export default function SalesRecord({}: SalesRecordProps) {
    const params = useLocalSearchParams();
    return (
        <ScreenBackground useBackAction bodyColor={Colors.lightGreen}>
            <Text style={styles.title}>Registro de venda</Text>
            <Text style={styles.subTitle}>Preencha os dados da venda</Text>
            <View style={
                styles.card
            }>
                <View style={{backgroundColor: Colors.lightGreen, aspectRatio: 1, padding: 8,
                    borderRadius: "50%",
                    width: 35,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Feather name="shopping-bag" size={18} color={Colors.secondary} />
                </View>
                <View style={{flexDirection: "column"}}>
                    <Text>Produto Selecionado</Text>
                    <Text>{params.name}</Text>
                    <Text>{params.value}</Text>
                </View>
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
        alignItems: "center"
      }
});