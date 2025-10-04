import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

import { LoadingIcon } from "@/src/components/loadingIcon";
import { useAppContext } from "@/src/useHook/useAppContext";

const LoadingScreen: React.FC = () => {
  const { colors } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      setTimeout(() => {
        router.replace("/screens/main/home");
      }, 1000);
    };
    init();
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingIcon size="large" />
    </View>
  );
};

export default LoadingScreen;
