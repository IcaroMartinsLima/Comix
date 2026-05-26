import { useThemeColors } from "@/hooks/useThemeColors";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useEffect, useMemo } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingBottom: insets.bottom,
          backgroundColor: theme.white,
        },
      }),
    [theme, insets.bottom],
  );

  useEffect(() => {
    const onBackPress = () => {
      BackHandler.exitApp();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Tabs
        initialRouteName="homeScreen"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
          tabBarActiveTintColor: theme.secondary,
        }}
      >
        <Tabs.Screen
          name="history"
          options={{
            title: "Histórico",
            tabBarActiveTintColor: theme.infoDark,
            tabBarIcon: ({ color, size }) => (
              <Feather name="clock" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="homeScreen"
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="ranking"
          options={{
            title: "Ranking",
            tabBarActiveTintColor: theme.black,
            tabBarIcon: ({ color, size }) => (
              <Feather name="award" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
