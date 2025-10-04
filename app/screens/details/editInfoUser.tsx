import React, { useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { useAppContext } from "@/src/useHook/useAppContext";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { useUser } from "@/src/useHook/userContext";
import {
  UserName,
  UserBirthday,
  UserEmail,
  UserPhoneNumbers,
  RenderUserAvata,
} from "@/src/components/userComponents";
import { SaveButton } from "@/src/components/saveButton";
import { validateEmail } from "@/src/utils/utils";

export type UserScreenType = unknown;

export const EditUserInfo = (props: UserScreenType) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  const router = useRouter();
  const { user, saveUser } = useUser();

  const email = useRef<string>("");
  const [error, setError] = useState("");

  const onChangeTextEmail = (text: string) => {
    email.current = text;
  };

  const onSave = async () => {
    if (validateEmail(email.current)) {
      const newUser = { ...user, email: email.current };
      await saveUser(newUser);
      router.back();
    } else {
      setError("Email không hợp lệ");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.scroll}>
        <RenderUserAvata
          haveAvatar="edit"
          containerStyles={styles.userAvatar}
        />
        <View style={styles.section}>
          <Text style={styles.label}>Thông tin tài khoản</Text>
          <UserName contentStyle={styles.disableValue} />
          <UserBirthday contentStyle={styles.disableValue} />
          <UserEmail editable error={error} onChangeText={onChangeTextEmail} />
          <UserPhoneNumbers contentStyle={styles.disableValue} />
        </View>
        <View style={{ alignItems: "center" }}>
          <SaveButton onSave={onSave} />
        </View>
      </View>
    </View>
  );
};

export default EditUserInfo;

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
  StyleSheet.create({
    scroll: {
      padding: size.padding.md,
      marginTop: size.margin.sm,
      flex: 1,
    },
    userAvatar: {
      position: "relative",
      top: 0,
    },
    section: {
      paddingHorizontal: size.padding.sm,
      marginTop: size.margin.xl,
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
    textInfo: {
      fontWeight: size.fontWeight.bold as "bold",
      fontSize: size.fontSize.md,
      color: colors.gray,
      opacity: 0.5,
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    disableValue: {
      color: colors.light_gray,
    },
  });
