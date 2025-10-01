import React, { useMemo } from "react";
import { Modal, View, StyleSheet, Pressable, Text } from "react-native";

import { useAppContext } from "@/src/useHook/useAppContext";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { ModalWrapperProps } from "@/src/utils/types";
import { FontAwesomeIcon, IoniconsIcon } from "@/src/components/icon";

export const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {
    const {
        children,
        visible,
        title = "",
        animationType = "none",
        containerStyle = {},
        modalContentStyle = {},
        onClose,
    } = props;
    const { colors, sizes } = useAppContext();
    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

    const handleClose = () => {
        onClose?.();
    };

    return (
        <Modal
            testID="modalWrapperContainer"
            visible={visible}
            animationType={animationType}
            transparent={true}
        >
            <Pressable
                testID="modalWrapperOutside"
                style={[styles.modalContainer, containerStyle]}
                onPress={handleClose}
            >
                <Pressable style={[styles.modalContent, modalContentStyle]}>
                    <View style={styles.header}>
                        <Pressable testID="modalWrapperBtnClose" onPress={handleClose}>
                            <IoniconsIcon
                                name="close-circle-outline"
                                size={40}
                                color={colors.dark_gray}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.content}>{children}</View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
    StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        modalContent: {
            width: "92%",
            backgroundColor: colors.white,
            borderRadius: sizes.borderRadius.xl,
            padding: size.padding.md,
        },
        header: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        title: {
            fontSize: size.fontSize.lg,
            fontWeight: size.fontWeight.bold as "bold",
            color: colors.white,
        },
        content: {
            flex: 1,
            padding: size.padding.sm,
            backgroundColor: colors.backgroundModal,
        },
    });