import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

// import { HeaderMain } from "@/app/screens/header/header";
import { useAppContext } from "@/src/useHook/useAppContext";

export default function MainScreens() {
    const { colors, t } = useAppContext();
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf="house.fill" drawable="custom_android_drawable" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings">
                <Icon sf="gear" drawable="custom_settings_drawable" />
                <Label>Settings</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}