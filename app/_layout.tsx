import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/src/useHook/useTheme";
import { TranslateProvider } from "@/src/useHook/useTranslate";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <TranslateProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </TranslateProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}