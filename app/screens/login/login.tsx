// LoginScreen.tsx
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

import { checkLoginByAccount } from "@/src/business/login/login";
import { AppLogo } from "@/src/components/appLogo";
import { ButtonField } from "@/src/components/buttonField";
import { InputField } from "@/src/components/inputField";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { useAppContext } from "@/src/useHook/useAppContext";
import { validateEmailOrPhone } from "@/src/utils/utils";

const LoginScreen = () => {
    const router = useRouter();
    const { colors, sizes, t, appName, appVersion } = useAppContext();
    const [username, setUsername] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin");
    const [error, setError] = useState<string | undefined>(undefined);

    const onForgetPassword = () => {
        router.push("/screens/login/forgetPassword");
    };

    const handleLogin = async () => {
        try {
            const result = await checkLoginByAccount(username, password);
            if (result.status) {
                router.replace("/screens/login/loading");
            } else {
                setError(t(result.message));
            }
        } catch (e) {
            Alert.alert(t("errorCannotGetData"));
            console.log("[handleLogin][login] ----> ", e);
        }
    };

    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

    const onResetError = () => {
        if (error) {
            setError(undefined);
        }
    };

    const onCheckUsername = (text: string) => {
        if (text.length <= 0) {
            return t("emailPhoneEmpty")
        } else if (!validateEmailOrPhone(text)) {
            return t("emailPhoneValidate");
        }
        return undefined;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={"height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -sizes.heightHeader : sizes.heightHeader}
        >
            <View style={styles.container}>
                <View style={styles.content}>

                    <AppLogo />
                    <Text style={styles.title}>Volkswage</Text>

                    <InputField
                        placeholder={t("enterUsername")}
                        value={username}
                        onChangeText={setUsername}
                        validator={onCheckUsername}
                        containerStyle={{ marginTop: sizes.margin.lg }}
                    />
                    <InputField
                        placeholder={t("enterPassword")}
                        type="password"
                        labelIcon="lock"
                        value={password}
                        secureTextEntry
                        errorText={error}
                        onChangeText={setPassword}
                        onFocus={onResetError}
                        containerStyle={{ marginTop: sizes.margin.sm }}
                    />

                    <View style={styles.linksContainer}>
                        <ButtonField
                            text={t("forgetPassword")}
                            type="text"
                            color={colors.primary}
                            onPress={onForgetPassword}
                            containerStyle={{ opacity: 0.7 }}
                        />
                    </View>

                    <ButtonField
                        text={t("logIn")}
                        type="fill"
                        color={colors.primary}
                        onPress={handleLogin}
                        disabled={!username || !password}
                        containerStyle={{
                            marginTop: sizes.margin.xxl,
                            width: "100%",
                            paddingVertical: sizes.padding.sm,
                        }}
                    />
                </View>

                <Text style={styles.versionText}>{appVersion}</Text>
            </View>
        </KeyboardAvoidingView>
    );
};

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        content: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: size.padding.xxl * 1.5,
        },
        title: {
            fontSize: size.fontSize.xxl * 1.5,
            fontWeight: size.fontWeight.bold as "bold",
            marginBottom: size.margin.xl,
            color: colors.text,
        },
        linksContainer: {
            flexDirection: "row",
            width: "100%",
            marginTop: size.margin.sm,
            justifyContent: "flex-end",
        },
        versionText: {
            color: colors.light_gray,
            alignSelf: "center",
            marginBottom: size.margin.xl,
        },
    });

export default LoginScreen;