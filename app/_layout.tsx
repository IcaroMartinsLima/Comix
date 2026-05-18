import migrations from "@/drizzle/migrations";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUserStore } from "@/stores/userStore";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { openDatabaseSync } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

const expoDb = openDatabaseSync("db.db");
export const db = drizzle(expoDb);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const user = useUserStore((state) => state.user);
  const [hasHydrated, setHasHydrated] = useState(
    useUserStore.persist.hasHydrated(),
  );
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (hasHydrated) {
      return;
    }

    const unsubscribe = useUserStore.persist.onHydrate(() => {
      setHasHydrated(true);
    });

    return unsubscribe;
  }, [hasHydrated]);

  
  if (error) return;
  if (!success) return;
  if (!hasHydrated) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
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
          <ToastManager />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
