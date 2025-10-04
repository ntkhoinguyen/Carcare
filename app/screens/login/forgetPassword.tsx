// app/create-account.tsx
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { checkEmailExist } from "@/src/business/login/login";
import { AppLogo } from "@/src/components/appLogo";
import { ButtonField } from "@/src/components/buttonField";
import { InputField } from "@/src/components/inputField";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { useAppContext } from "@/src/useHook/useAppContext";

const ForgetPassword = () => {
    const router = useRouter();
    const { colors, sizes, t } = useAppContext();
    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleForget = async () => {
        try {
            const result = await checkEmailExist(email);
            if (result.status) {
                setError("");
            } else {
                setError(t(result.message));
            }
        } catch (e) {
            console.log("[handleLogin][login] ----> ", e);
            setError(t("accountError"));
        }
    };

    const handleGoback = () => {
        router.back();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>

                <AppLogo />

                <InputField
                    type="email"
                    placeholder={t("enterUsername")}
                    required
                    value={email}
                    errorText={error}
                    onChangeText={setEmail}
                    containerStyle={{ marginTop: sizes.margin.xxl * 2 }}
                />

                <ButtonField
                    text={t("getPassword")}
                    type="fill"
                    color={colors.primary}
                    onPress={handleForget}
                    disabled={!email}
                    containerStyle={{
                        marginTop: sizes.margin.lg,
                        width: "100%",
                        paddingVertical: sizes.padding.sm,
                    }}
                />

                {/* Nút quay về login */}
                <ButtonField
                    text={t("backToLogin")}
                    type="text"
                    color={colors.primary}
                    onPress={handleGoback}
                    containerStyle={{ marginTop: sizes.margin.xl }}
                />
            </View>
        </View>
    );
};

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
    StyleSheet.create({
        container: {
            padding: size.padding.xxl * 1.5,
            flex: 1,
            alignItems: "center",
            backgroundColor: colors.background,
            justifyContent: "center",
        },
        backToLogin: {
            textAlign: "center",
            fontSize: size.fontSize.md,
            color: colors.primary,
            fontWeight: size.fontWeight.medium as "500",
        },
        warning: {
            color: colors.red,
            fontSize: size.fontSize.md,
            marginVertical: size.margin.md,
        },
    });

export default ForgetPassword; // use auto in _layout