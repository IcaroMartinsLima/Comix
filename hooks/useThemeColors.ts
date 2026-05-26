import { useColorScheme } from "react-native";
import { DarkColors, LightColors, AppThemeColors } from "@/constants/colors";

export function useThemeColors(): AppThemeColors {
  const scheme = useColorScheme();
  return scheme === "dark" ? DarkColors : LightColors;
}
