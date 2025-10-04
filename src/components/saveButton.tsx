import { View, Text, StyleSheet } from "react-native";

import { SinglePressTouchable } from "@/src/components/SinglePressTouchable";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { FontAwesome5Icon } from "@/src/components/icon";
import { useAppContext } from "@/src/useHook/useAppContext";
import { useMemo } from "react";

export const SaveButton = (props: { onSave: () => void }) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  const onHandleSave = () => {
    props.onSave?.();
  };

  return (
    <SinglePressTouchable onPress={onHandleSave}>
      <View style={styles.container}>
        <Text style={styles.text}>Lưu</Text>
        <FontAwesome5Icon name="sync" size={22} />
      </View>
    </SinglePressTouchable>
  );
};

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
  StyleSheet.create({
    container: {
      alignSelf: "center",
      marginTop: 40,
      flexDirection: "row",
      backgroundColor: colors.light,
      padding: sizes.padding.sm,
      paddingHorizontal: sizes.padding.xl,
      borderRadius: sizes.borderRadius.lg,
    },
    text: {
      fontSize: sizes.fontSize.xl,
      fontWeight: "bold",
      color: colors.primary,
      marginRight: sizes.margin.md,
    },
  });
