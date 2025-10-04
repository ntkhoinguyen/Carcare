import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";

import { MainHeader } from "@/app/screens/headers/mainHeader";
import { useAppContext } from "@/src/useHook/useAppContext";
import { sizes } from "@/src/themes/sizes";
import { defaultColors } from "@/src/themes/colors";

const IconFontAwesome5 = (props: {
  name: string;
  focused: boolean;
  color: string;
}) => {
  const { name, focused, color } = props;
  return (
    <View
      style={[
        styles.tabBarIcon,
        {
          backgroundColor: focused
            ? defaultColors.white
            : defaultColors.primary,
          height: focused ? 46 : 40,
          width: focused ? 46 : 40,
        },
      ]}
    >
      <FontAwesome5 name={name} color={color} size={28} />
    </View>
  );
};

const IconIonicons = (props: {
  name: string;
  focused: boolean;
  color: string;
}) => {
  const { name, focused, color } = props;
  return (
    <View
      style={[
        styles.tabBarIcon,
        {
          backgroundColor: focused
            ? defaultColors.white
            : defaultColors.primary,
          height: focused ? 46 : 40,
          width: focused ? 46 : 40,
        },
      ]}
    >
      <Ionicons name={name as any} color={color} size={28} />
    </View>
  );
};

export default function MainScreens() {
  const { colors, t } = useAppContext();
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        header(props) {
          return <MainHeader {...props} />;
        },
        tabBarItemStyle: { marginTop: 10 },
        tabBarStyle: { ...styles.tabBarStyle },
        tabBarHideOnKeyboard: false,
        tabBarShowLabel: false,

        tabBarInactiveBackgroundColor: colors.transparent,
        tabBarActiveBackgroundColor: colors.transparent,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
      }}
    >
      <Tabs.Screen
        name="cars"
        options={{
          title: t("cars"),
          tabBarIcon: ({ color, focused }) => (
            <IconFontAwesome5 name="car" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color, focused }) => (
            <IconIonicons name="settings" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <IconFontAwesome5 name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shoppingCart"
        options={{
          title: t("shoppingCart"),
          tabBarIcon: ({ color, focused }) => (
            <IconFontAwesome5
              name="shopping-cart"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        initialParams={{ haveAvatar: "edit" }}
        options={{
          title: t("user"),
          tabBarIcon: ({ color, focused }) => (
            <IconFontAwesome5 name="user-alt" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: defaultColors.primary,
    borderColor: defaultColors.transparent,
    paddingHorizontal: sizes.padding.lg,
    position: "absolute",
    bottom: 24,
    marginLeft: "4%",
    borderRadius: 60,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "92%",
  },
  tabBarIcon: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
  },
});
