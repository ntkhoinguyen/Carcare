import { Stack } from "expo-router";

import DetailHeader from "@/app/screens/headers/detailHeader";
import { useAppContext } from "@/src/useHook/useAppContext";

export default function DetailScreens() {
  const { t } = useAppContext();
  return (
    <Stack
      screenOptions={{
        header(props) {
          return <DetailHeader {...props} />;
        },
        navigationBarHidden: false,
        animation: "slide_from_right",
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen
        name="editInfoUser"
        options={{
          title: t("userInfo"),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="changePW"
        options={{
          title: t("changePW"),
        }}
      ></Stack.Screen>
    </Stack>
  );
}
