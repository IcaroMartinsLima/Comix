import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-get-random-values";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUserStore } from "@/stores/userStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const user = useUserStore((state) => state.user);
  const [hasHydrated, setHasHydrated] = useState(
    useUserStore.persist.hasHydrated(),
  );

  useEffect(() => {
    if (hasHydrated) {
      return;
    }

    const unsubscribe = useUserStore.persist.onHydrate(() => {
      setHasHydrated(true);
    });

    return unsubscribe;
  }, [hasHydrated]);

  if (!hasHydrated) {
    return (
      <GestureHandlerRootView
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="signIn" options={{ headerShown: false }} />
            </>
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
