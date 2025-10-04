import React, { useMemo } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IoniconsIcon } from "@/src/components/icon";
import { useRouter } from "expo-router";

import { useAppContext } from "@/src/useHook/useAppContext";
import { sizes } from "@/src/themes/sizes";
import { defaultColors } from "@/src/themes/colors";
import { SinglePressTouchable } from "@/src/components/SinglePressTouchable";
import {
  LeftDetailHeader,
  RightDetailHeader,
  DetailHeaderType,
} from "@/src/utils/types";

const DetailHeader: React.FC<DetailHeaderType> = (props) => {
  const insets = useSafeAreaInsets();

  const { options } = props;
  const { title } = options;

  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  const containerStyle = useMemo(() => {
    const style = [
      styles.container,
      { paddingTop: insets.top, height: sizes.heightHeader + insets.top },
    ];
    return style;
  }, [insets.top, sizes.heightHeader, styles.container]);

  return (
    <ImageBackground
      source={require("@/assets/images/headerImage.png")}
      resizeMode="stretch"
      style={containerStyle}
    >
      <LeftHeader leftOptions={[]} title={title} />
      <RightHeader rightOptions={[]} />
    </ImageBackground>
  );
};

const LeftHeader = (props: LeftDetailHeader) => {
  const { title } = props;
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  const router = useRouter();

  const gotoBack = () => {
    router.back();
  };

  return (
    <View style={styles.leftHeaderContainer}>
      <SinglePressTouchable onPress={gotoBack}>
        <IoniconsIcon name="arrow-back" size={40} color={colors.primary} />
      </SinglePressTouchable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const RightHeader = (props: RightDetailHeader) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  return <View style={styles.rightHeaderContainer}></View>;
};

export default DetailHeader;

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    leftHeaderContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    iconLogo: {
      height: 48,
      width: 48,
    },
    title: {
      fontSize: size.fontSize.xxl,
      fontWeight: size.fontWeight.bold as "bold",
      color: colors.text,
      maxWidth: "80%",
      marginLeft: size.margin.sm,
    },
    rightHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    userAvataContent: {
      position: "absolute",
      top: 0,
      width: "100%",
      justifyContent: "center",
      flexDirection: "row",
    },
    userLogo: {
      height: 100,
      width: 100,
      backgroundColor: colors.white,
      borderRadius: 50,
    },
    iconChangeAvatar: {
      borderBottomWidth: 5,
      borderColor: defaultColors.primary,
      alignSelf: "flex-end",
      marginLeft: -8,
    },
  });
