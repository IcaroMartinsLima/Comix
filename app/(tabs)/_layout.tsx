import { Colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { BackHandler, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
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

  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Tabs
        initialRouteName="homeScreen"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
          tabBarActiveTintColor: Colors.secondary,
        }}
      >
        <Tabs.Screen
          name="history"
          options={{
            title: "Histórico",
            tabBarActiveTintColor: Colors.infoDark,
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
            tabBarActiveTintColor: Colors.dark,
            tabBarIcon: ({ color, size }) => (
              <Feather name="award" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
