import * as SecureStore from "expo-secure-store";

import { validateEmailOrPhone } from "@/src/utils/utils";

export const checkLoginByAccount = async (username: string, password: string): Promise<{ status: boolean, message: string }> => {
    try {
        if (!username || !password) {
            return { status: false, message: "emailPhoneEmpty" };
        } else if (!validateEmailOrPhone(username)) {
            return { status: false, message: "emailPhoneValidate" };
        } else {

            const key = username.slice(0, username.indexOf("@"));
            const user = await SecureStore.getItemAsync(key);
            if (user) {
                const userData = JSON.parse(user);
                if (userData.password === password && userData.username === username) {
                    return { status: true, message: "" };
                } else {
                    return { status: false, message: "wrongAccount" };
                }
            } else {
                const admin = await SecureStore.getItemAsync("admin");
                if (!admin) {
                    await SecureStore.setItemAsync("admin", JSON.stringify({ username: "admin@gmail.com", password: "admin", useId: 1 }));
                    if (username === "admin@gmail.com" && password === "admin") {
                        return { status: true, message: "" };
                    }
                }
                return { status: false, message: "wrongAccount" };
            }
        }
    } catch (e) {
        console.log("[checkLoginByAccount] ----> ", e);
        return { status: false, message: "errorCannotGetData" };
    }
}

export const checkEmailExist = async (email: string): Promise<{ status: boolean, message: string }> => {
    try {
        if (!email) {
            return { status: false, message: "emailPhoneEmpty" };
        } else if (!validateEmailOrPhone(email)) {
            return { status: false, message: "emailPhoneValidate" };
        } else {
            const key = email.slice(0, email.indexOf("@"));
            const user = await SecureStore.getItemAsync(key);
            if (user) {
                return { status: true, message: "" };
            } else {
                return { status: false, message: "emailNotExist" };
            }
        }
    } catch (e) {
        console.log("[checkEmailExist] ----> ", e);
        return { status: false, message: "errorCannotGetData" }
    }
}