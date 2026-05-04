import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MuiltColorBackgroundProps = {
  children: ReactNode;
  headerColor?: string;
  headerHeight?: number;
};

export default function ScreenBackground({
  children,
  headerColor = "#16a34a",
  headerHeight = 150,
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
      />

      <View
        style={[
          styles.content,
          {
            paddingTop: headerHeight - 50,
            paddingBottom: insets.bottom,
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
  content: {
    flex: 1,
    alignItems: "center",
  },
});
