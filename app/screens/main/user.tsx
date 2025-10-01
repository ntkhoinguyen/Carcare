import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
  ImageBackground,
} from "react-native";
import {
  FontAwesome6,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

import { useAppContext } from "@/src/useHook/useAppContext";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { AttachmentPicker } from "@/src/components/attachmentPicker";
import { RowLabel } from "@/src/components/rowLabel";

export type UserScreenType = {};
export type RenderUserAvataType = {
  url?: string;
};

export const UserScreen = (props: UserScreenType) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  const Name = useCallback(
    () => (
      <Text style={[styles.textInfo, { textTransform: "uppercase" }]}>
        Nguyen tran khoi nguyen
      </Text>
    ),
    [styles]
  );
  const Birthday = useCallback(
    () => (
      <Text style={[styles.textInfo, { textTransform: "uppercase" }]}>
        29/01/1995
      </Text>
    ),
    [styles]
  );
  const Email = useCallback(
    () => (
      <View style={styles.row}>
        <Text style={[styles.textInfo]}>khnguyensp@gmail.com</Text>
        <FontAwesome6
          name="pencil"
          size={14}
          color={defaultColors.black}
          style={{
            marginLeft: 8,
            borderBottomWidth: 2,
            borderColor: colors.primary,
          }}
        />
      </View>
    ),
    [styles]
  );
  const SDT = useCallback(
    () => <Text style={[styles.textInfo]}>0394114682</Text>,
    [styles]
  );
  const FaceID = useCallback(() => {
    return (
      <View style={{ height: 30, width: 50 }}>
        <Switch
          value={true}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    );
  }, [styles]);
  const DKSD = useCallback(
    () => <FontAwesome name="check-square-o" size={24} />,
    [styles]
  );
  const CSQRT = useCallback(
    () => <AntDesign name="file-protect" size={22} />,
    [styles]
  );
  const ChangePW = useCallback(
    () => (
      <View style={styles.row}>
        <Text style={[styles.textInfo]}>**********</Text>
        <FontAwesome6
          name="pencil"
          size={14}
          color={defaultColors.black}
          style={{
            marginLeft: 8,
            borderBottomWidth: 2,
            borderColor: colors.primary,
          }}
        />
      </View>
    ),
    [styles]
  );

  const DeleteAccount = useCallback(
    () => <MaterialIcons name="delete-forever" size={24} color={colors.red} />,
    [styles]
  );

  const Logout = useCallback(
    () => <AntDesign name="logout" size={24} />,
    [styles]
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/headerImage.png")}
        style={styles.imageBackground}
      />
      <ImageBackground
        source={require("@/assets/images/headerImage.png")}
        style={styles.imageBackground}
      />
      <RenderUserAvata />
      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <Text style={styles.label}>Thông tin tài khoản</Text>
          <RowLabel label={"Họ và Tên"} Content={Name} variant={"underline"} />
          <RowLabel
            label={"Ngày sinh"}
            Content={Birthday}
            variant={"underline"}
          />
          <RowLabel label={"Email"} Content={Email} variant={"underline"} />
          <RowLabel label={"Số điện thoại"} Content={SDT} variant={"fill"} />
        </View>
        <View style={styles.underLine}></View>
        <View style={styles.section}>
          <Text style={styles.label}>Ứng dụng</Text>
          <RowLabel
            label={"Đăng nhập bằng gương mặt"}
            Content={FaceID}
            variant={"underline"}
          />
          <RowLabel
            label={"Điều khoản sử dung ứng dụng"}
            Content={DKSD}
            variant={"underline"}
          />
          <RowLabel
            label={"Chính sách và quyền riêng tư"}
            Content={CSQRT}
            variant={"fill"}
          />
        </View>
        <View style={styles.underLine}></View>
        <View style={styles.section}>
          <Text style={styles.label}>Cài đặt</Text>
          <RowLabel
            label={"Thay đổi mật khẩu"}
            Content={ChangePW}
            variant={"underline"}
          />
          <RowLabel
            label={"Xóa tài khoản"}
            Content={DeleteAccount}
            variant={"underline"}
            labelStyle={{ color: colors.red }}
          />
          <RowLabel
            label={"Đăng xuất"}
            Content={Logout}
            variant={"underline"}
          />
        </View>
        <View style={styles.bottombar} />
      </ScrollView>
      <View style={styles.headphones}>
        <FontAwesome name="headphones" color={colors.white} size={32} />
      </View>
    </View>
  );
};

const RenderUserAvata = (props: RenderUserAvataType) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  const { url } = props;

  const onPickImageAvatar = async (uris: string[], isMove: boolean) => {
    console.log("kiem tra uris --", uris);
    // try {
    //     if (uris.length > 0 && uris[0] !== "") {
    //         const newData = { ...user, avatar: uris[0] };
    //         const newUser = await saveSettingImage(newData, "avatar", isMove);
    //         if (!newUser) {
    //             Alert.alert(t("cannotSaveImage"));
    //         } else {
    //             setUser(newUser);
    //         }
    //     } else {
    //         Alert.alert(t("cannotSelectImage"));
    //     }
    // } catch (error) {
    //     console.error("[setting][onPickCoverImage] ----", error);
    //     Alert.alert(t("errorSelectImage"));
    // }
  };

  const onChangeAvatar = () => {
    open();
  };

  return (
    <View style={styles.userAvataContent}>
      <Image
        source={require("@/assets/images/userLogo.png")}
        style={styles.userLogo}
        resizeMode="cover"
      ></Image>
      <View style={styles.iconChangeAvatar}>
        <AttachmentPicker
          onSelect={onPickImageAvatar}
          multiple={false}
          type="image/*"
          RenderItem={IconChangeAvatar}
        />
      </View>
    </View>
  );
};

const IconChangeAvatar = () => {
  return <FontAwesome6 name="pencil" size={18} color={defaultColors.black} />;
};

export default UserScreen;

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
  StyleSheet.create({
    imageBackground: {
      height: 20,
      width: "100%",
    },
    userAvataContent: {
      position: "absolute",
      top: 0,
      width: "100%",
      justifyContent: "center",
      flexDirection: "row",
    },
    userLogo: {
      height: 100,
      width: 100,
      backgroundColor: colors.white,
      borderRadius: 50,
    },
    iconChangeAvatar: {
      borderBottomWidth: 5,
      borderColor: defaultColors.primary,
      alignSelf: "flex-end",
      marginLeft: -8,
    },
    scroll: {
      padding: size.padding.md,
      marginTop: 50,
      marginBottom: 60,
      flex: 1,
    },
    section: {
      paddingHorizontal: size.padding.sm,
    },
    label: {
      fontSize: size.fontSize.sm,
      color: colors.gray,
      fontWeight: size.fontWeight.bold as "bold",
      textTransform: "uppercase",
      opacity: 0.3,
    },
    underLine: {
      height: size.padding.xs,
      width: "100%",
      backgroundColor: colors.gray,
      marginVertical: sizes.margin.sm,
      opacity: 0.5,
    },
    textInfo: {
      fontWeight: size.fontWeight.bold as "bold",
      fontSize: size.fontSize.md,
      color: colors.primary,
    },
    bottombar: {
      height: 120,
      width: "100%",
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    headphones: {
      height: 48,
      width: 48,
      borderRadius: 44,
      backgroundColor: colors.primary,
      position: "absolute",
      bottom: 100,
      right: 16,
      justifyContent: "center",
      alignItems: "center",
    },
  });
