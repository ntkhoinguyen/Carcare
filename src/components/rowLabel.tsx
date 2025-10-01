import { View, StyleSheet, Text } from "react-native";

import { useAppContext } from "@/src/useHook/useAppContext";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes"
import { useMemo } from "react";


export type RowLabelType = {
    label?: string;
    Content: React.ComponentType<any>;
    variant?: "underline" | "border" | "fill",
    containerStyle?: {},
    labelStyle?: {},
}

export const RowLabel = (props: RowLabelType) => {
    const { colors, sizes } = useAppContext();
    const styles = useMemo(() => createStyle(sizes, colors), [sizes, colors])
    const { label, Content, variant = "fill", containerStyle, labelStyle } = props;

    const variantStyle = useMemo(() => {
        if(variant === "underline") {
            return {borderWidth: 0, borderBottomWidth: sizes.borderWidth.xs, borderColor: colors.border}
        }else if(variant === "fill") {
            return {borderWidth: 0}
        }
        return {}
    }, [variant, sizes, colors])


    return <View style={[styles.container, variantStyle, containerStyle]}>
        <Text style={[styles.label,labelStyle]}>{label}</Text>
        <Content />
    </View>;
}

const createStyle = (size: typeof sizes, colors: typeof defaultColors) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            borderRadius: size.borderRadius.sm,
            borderWidth: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: size.padding.md
        },
        label: {
            fontSize: size.fontSize.md,
            textTransform: "uppercase"
        }
    })
}