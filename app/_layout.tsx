import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";

export default function RootLayout() {
  const colors = useThemeColor();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="form" />
    </Stack>
  );
}
