import { Colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MuiltColorBackgroundProps = {
  children: ReactNode;
  headerColor?: string;
  headerHeight?: number;
  useBackAction?: boolean;
};

export default function ScreenBackground({
  children,
  headerColor = "#16a34a",
  headerHeight = 150,
  useBackAction = false,
}: MuiltColorBackgroundProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: headerColor,
            height: headerHeight + insets.top,
          },
        ]}
      >
        {useBackAction && (
          <TouchableOpacity style={styles.touch} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={Colors.white} />{" "}
            <Text style={styles.text}>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={[
          styles.content,
          {
            paddingTop: headerHeight - 80,
            paddingBottom: insets.bottom,
            paddingHorizontal: 16,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  touch: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: Colors.white,
  },
});
