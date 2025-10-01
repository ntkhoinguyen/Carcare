import React, { useMemo } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppContext } from "@/src/useHook/useAppContext";
import { sizes } from "@/src/themes/sizes";
import { defaultColors } from "@/src/themes/colors";

export type MainHeaderType = {
    options: {
        title?: string;
        leftOptions: string[];
        rightOptions: string[];
    };
} & any;

export type LeftMainHeader = {
    title?: string;
    leftOptions: string[];
}

export type RightMainHeader = {
    rightOptions: string[];
}

export const MainHeader: React.FC<LeftMainHeader> = (
    props: MainHeaderType
) => {

    const insets = useSafeAreaInsets();

    const { options } = props;
    const { title, leftOptions, rightOptions } = options;

    const { colors, sizes } = useAppContext();
    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

    const containerStyle = useMemo(() => {
        const style = [styles.container, { paddingTop: insets.top, height: sizes.heightHeader + insets.top }]
        return style;
    }, [insets, styles])

    return (
        <ImageBackground
            source={require("@/assets/images/headerImage.png")}
            resizeMode="stretch"
            style={containerStyle}
        >
            <LeftHeader leftOptions={leftOptions} title={title} />
            <RightHeader rightOptions={rightOptions} />
        </ImageBackground>
    );
};

const LeftHeader = (props: LeftMainHeader) => {
    const { title, leftOptions } = props;
    const { colors, sizes } = useAppContext();
    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

    return (
        <View style={styles.leftHeaderContainer}>
            <Image source={require("@/assets/images/logoIcon.png")} style={styles.iconLogo} resizeMode="cover" />
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
    )
}

const RightHeader = (props: RightMainHeader) => {
    const { colors, sizes } = useAppContext();
    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
    return <View style={styles.rightHeaderContainer}>

    </View>;
}

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
    StyleSheet.create({
        container: {
            alignItems: "center",
            flexDirection: "row"
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
            maxWidth: "80%"
        },
        rightHeaderContainer: {
            flexDirection: "row",
            alignItems: "center",
        }
    });