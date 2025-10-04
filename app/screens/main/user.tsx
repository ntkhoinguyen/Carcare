import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useAppContext } from "@/src/useHook/useAppContext";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import {
  UserBirthday,
  UserChangePW,
  UserCSQRT,
  UserDeleteAccount,
  UserDKSD,
  UserEmail,
  UserFaceID,
  UserLogout,
  UserName,
  UserPhoneNumbers,
  HeaderPhone,
} from "@/src/components/userComponents";

export type UserScreenType = unknown;
export type RenderUserAvataType = {
  url?: string;
};

export const UserScreen = (props: UserScreenType) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <Text style={styles.label}>Thông tin tài khoản</Text>
          <UserName />
          <UserBirthday />
          <UserEmail />
          <UserPhoneNumbers />
        </View>
        <View style={styles.underLine}></View>

        <View style={styles.section}>
          <Text style={styles.label}>Ứng dụng</Text>
          <UserFaceID />
          <UserDKSD />
          <UserCSQRT />
        </View>
        <View style={styles.underLine}></View>

        <View style={styles.section}>
          <Text style={styles.label}>Cài đặt</Text>
          <UserChangePW />
          <UserDeleteAccount />
          <UserLogout />
        </View>

        <View style={styles.bottombar} />
      </ScrollView>
      <HeaderPhone />
    </View>
  );
};

export default UserScreen;

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
  StyleSheet.create({
    scroll: {
      padding: size.padding.md,
      marginTop: 50,
      marginBottom: 60,
      flex: 1,
    },
    section: {
      paddingHorizontal: size.padding.sm,
      paddingTop: size.padding.sm,
    },
    label: {
      fontSize: size.fontSize.sm,
      color: colors.gray,
      fontWeight: size.fontWeight.bold as "bold",
      textTransform: "uppercase",
      opacity: 0.3,
    },
    underLine: {
      height: size.padding.xs,
      width: "100%",
      backgroundColor: colors.gray,
      marginVertical: sizes.margin.sm,
      opacity: 0.5,
    },
    bottombar: {
      height: 120,
      width: "100%",
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
