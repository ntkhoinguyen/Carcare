import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        navigationBarHidden: false,
        animation: "slide_from_right",
        statusBarStyle: "light",
      }}
    ></Stack>
  );
}