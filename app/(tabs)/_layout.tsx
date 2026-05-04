import Feather from "@expo/vector-icons/Feather";
import { Tabs, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const router = useRouter();

  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="homeScreen"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="history"
          options={{
            title: "Histórico",
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
            tabBarIcon: ({ color, size }) => (
              <Feather name="award" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
