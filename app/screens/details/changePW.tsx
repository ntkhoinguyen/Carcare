import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { useAppContext } from "@/src/useHook/useAppContext";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { InputField } from "@/src/components/inputField";
import { RenderUserAvata } from "@/src/components/userComponents";
import { SaveButton } from "@/src/components/saveButton";
import { ChangePassword } from "@/src/business/changePW";

export const ChangePW = () => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  const router = useRouter();

  const [oldPW, setOldPW] = useState("");
  const [pwError, setPwError] = useState("");

  const [newPW, setNewPW] = useState("");
  const [reNewPW, setReNewPW] = useState("");
  const [rePwError, setRePwError] = useState("");

  const onSave = async () => {
    const { pwEror, newPWError, status } = await ChangePassword(
      oldPW,
      newPW,
      reNewPW
    );
    setPwError(pwEror);
    setRePwError(newPWError);
    if (status === "done") {
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.scroll}>
        <RenderUserAvata
          haveAvatar="readonly"
          containerStyles={styles.userAvatar}
        />
        <InputField
          value={oldPW}
          label="Mật khẩu cũ"
          onChangeText={setOldPW}
          type={"password"}
          borderType={"default"}
          errorText={pwError}
          inputStyle={{
            borderColor: colors.primary,
            borderRadius: sizes.borderRadius.xl,
          }}
          labelStyle={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: sizes.fontSize.xl,
          }}
          containerStyle={{
            marginTop: sizes.margin.xxl,
          }}
        />

        <InputField
          value={newPW}
          label="Mật khẩu mới"
          onChangeText={setNewPW}
          type={"password"}
          borderType={"default"}
          inputStyle={{
            borderColor: colors.primary,
            borderRadius: sizes.borderRadius.xl,
          }}
          labelStyle={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: sizes.fontSize.xl,
          }}
          containerStyle={{ marginTop: 24 }}
        />

        <InputField
          value={reNewPW}
          label="Nhập lại mật khẩu mới"
          onChangeText={setReNewPW}
          type={"password"}
          borderType={"default"}
          errorText={rePwError}
          inputStyle={{
            borderColor: colors.primary,
            borderRadius: sizes.borderRadius.xl,
          }}
          labelStyle={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: sizes.fontSize.xl,
          }}
          containerStyle={{ marginTop: 24 }}
        />

        <SaveButton onSave={onSave} />
      </View>
    </View>
  );
};

export default ChangePW;

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
  StyleSheet.create({
    userAvatar: {
      position: "relative",
      top: 0,
    },
    scroll: {
      padding: size.padding.xxl,
      flex: 1,
    },
    label: {
      fontSize: size.fontSize.sm,
      color: colors.gray,
      fontWeight: size.fontWeight.bold as "bold",
      textTransform: "uppercase",
      opacity: 0.3,
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
