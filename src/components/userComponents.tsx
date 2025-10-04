import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, StyleSheet, View, Text, TextInput, Switch } from "react-native";
import { useRouter } from "expo-router";

import { useAppContext } from "@/src/useHook/useAppContext";
import { useUser } from "@/src/useHook/userContext";
import { RenderUserAvataType } from "@/src/utils/types";
import { AttachmentPicker } from "@/src/components/attachmentPicker";
import {
  AntDesignIcon,
  FontAwesome6Icon,
  FontAwesomeIcon,
  IoniconsIcon,
  MaterialIconsIcon,
} from "@/src/components/icon";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import { RowLabel } from "@/src/components/rowLabel";
import { SinglePressTouchable } from "@/src/components/SinglePressTouchable";

export const RenderUserAvata = (props: RenderUserAvataType) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  const { user, setUser } = useUser();
  const { haveAvatar, containerStyles } = props;

  const IconChangeAvatar = useCallback(() => {
    return (
      <FontAwesome6Icon name="pencil" size={18} color={defaultColors.black} />
    );
  }, []);

  const IconEdit = useCallback(() => {
    const onPickImageAvatar = (uris: string[]) => {
      if (uris[0]) setUser({ ...user, avatar: uris[0] });
    };

    if (haveAvatar === "readonly") return null;

    return (
      <View style={styles.iconChangeAvatar}>
        <AttachmentPicker
          onSelect={onPickImageAvatar}
          multiple={false}
          type="image/*"
          RenderItem={IconChangeAvatar}
        />
      </View>
    );
  }, [IconChangeAvatar, setUser, styles.iconChangeAvatar, user, haveAvatar]);

  if (!haveAvatar) return null;

  return (
    <View style={[styles.userAvataContent, containerStyles]}>
      <Image
        source={{
          uri: `data:image/png;base64,${user.avatar}`,
        }}
        style={styles.userLogo}
        resizeMode="cover"
      ></Image>
      <IconEdit />
    </View>
  );
};

export const UserName = React.memo((props: { contentStyle?: object }) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  const { user } = useUser();
  const { contentStyle } = props;

  const Name = useCallback(() => {
    return (
      <Text
        style={[styles.textInfo, { textTransform: "uppercase" }, contentStyle]}
      >
        {user.name}
      </Text>
    );
  }, [contentStyle, styles.textInfo, user.name]);

  return <RowLabel label={"Họ và Tên"} Content={Name} variant={"underline"} />;
});
UserName.displayName = "UserName";

export const UserBirthday = React.memo((props: { contentStyle?: object }) => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  const { user } = useUser();
  const { contentStyle } = props;

  const Birthday = useCallback(
    () => (
      <Text
        style={[styles.textInfo, { textTransform: "uppercase" }, contentStyle]}
      >
        {user.birthday}
      </Text>
    ),
    [contentStyle, styles.textInfo, user.birthday]
  );

  return (
    <RowLabel label={"Ngày sinh"} Content={Birthday} variant={"underline"} />
  );
});
UserBirthday.displayName = "Birthday";

export const UserEmail = React.memo(
  (props: {
    editable?: boolean;
    contentStyle?: object;
    error?: string;
    onChangeText?: (v: string) => void;
  }) => {
    const { colors, sizes } = useAppContext();
    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
    const { user } = useUser();
    const router = useRouter();
    const { editable = false, error = "" } = props;

    const [email, setEmail] = useState(user.email);
    const [errorText, setError] = useState(error);

    const emailRef = useRef<any>(null);

    useEffect(() => {
      if (emailRef && emailRef.current && emailRef.current.focus) {
        emailRef.current?.focus?.();
      }
    }, []);

    useEffect(() => {
      setError(error);
    }, [error]);

    useEffect(() => {
      setEmail(user.email);
    }, [user]);

    const onChangeText = (text: string) => {
      props?.onChangeText?.(text);
      setEmail(text);
    };

    const IconPencil = useCallback(() => {
      const gotoEditInfo = () => {
        router.push("/screens/details/editInfoUser");
      };

      if (editable) return null;
      return (
        <SinglePressTouchable onPress={gotoEditInfo}>
          <FontAwesome6Icon
            name="pencil"
            size={14}
            color={defaultColors.black}
            style={{
              marginLeft: 8,
              borderBottomWidth: 2,
              borderColor: colors.primary,
            }}
          />
        </SinglePressTouchable>
      );
    }, [colors.primary, editable, router]);

    const IconClear = useCallback(() => {
      const onClearText = () => {
        onChangeText("");
      };
      if (!editable) return null;

      return (
        <SinglePressTouchable onPress={onClearText}>
          <IoniconsIcon name="close-circle-outline" size={20} />
        </SinglePressTouchable>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editable]);

    return (
      <View style={[styles.containerEmail]}>
        <View style={[styles.contentEmail]}>
          <Text style={[styles.labelRow]}>Email</Text>
          <View style={[styles.row, { flex: 1, marginLeft: sizes.margin.xxl }]}>
            <View style={{ flex: 1 }} />
            <TextInput
              ref={emailRef}
              editable
              readOnly={!editable}
              value={email}
              onChangeText={onChangeText}
              style={[styles.textInfo]}
            ></TextInput>
            <IconPencil />
            <IconClear />
          </View>
        </View>
        {error ? <Text style={styles.textError}>{errorText}</Text> : null}
      </View>
    );
  }
);
UserEmail.displayName = "UserEmail";

export const UserPhoneNumbers = React.memo(
  (props: { contentStyle?: object }) => {
    const { colors, sizes } = useAppContext();
    const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
    const { user } = useUser();
    const { contentStyle } = props;

    const PhoneNumbers = useCallback(
      () => <Text style={[styles.textInfo, contentStyle]}>{user.phone}</Text>,
      [contentStyle, styles.textInfo, user.phone]
    );

    return (
      <RowLabel
        label={"Số điện thoại"}
        Content={PhoneNumbers}
        variant={"fill"}
      />
    );
  }
);
UserPhoneNumbers.displayName = "UserPhoneNumbers";

export const UserFaceID = React.memo(() => {
  const { user, setUser } = useUser();

  const FaceID = useCallback(() => {
    const onChangeFaceID = () => {
      setUser({ ...user, loginFaceId: !user.loginFaceId });
    };

    return (
      <View style={{ height: 30, width: 50 }}>
        <Switch
          onChange={onChangeFaceID}
          value={user.loginFaceId}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <RowLabel
      label={"Đăng nhập bằng gương mặt"}
      Content={FaceID}
      variant={"underline"}
    />
  );
});
UserFaceID.displayName = "UserFaceID";

export const UserDKSD = React.memo(() => {
  const DKSD = useCallback(
    () => <FontAwesomeIcon name="check-square-o" size={24} />,
    []
  );

  return (
    <RowLabel
      label={"Điều khoản sử dung ứng dụng"}
      Content={DKSD}
      variant={"underline"}
    />
  );
});
UserDKSD.displayName = "UserDKSD";

export const UserCSQRT = React.memo(() => {
  const CSQRT = useCallback(
    () => <AntDesignIcon name="file-protect" size={22} />,
    []
  );

  return (
    <RowLabel
      label={"Chính sách và quyền riêng tư"}
      Content={CSQRT}
      variant={"fill"}
    />
  );
});
UserCSQRT.displayName = "UserCSQRT";

export const UserChangePW = React.memo(() => {
  const router = useRouter();
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  const ChangePW = useCallback(() => {
    const onChangePW = () => {
      router.push("/screens/details/changePW");
    };

    return (
      <View style={[styles.row, { justifyContent: "flex-end" }]}>
        <Text style={[styles.textInfo]}>**********</Text>
        <SinglePressTouchable onPress={onChangePW}>
          <FontAwesome6Icon
            name="pencil"
            size={14}
            color={defaultColors.black}
            style={{
              marginLeft: 8,
              borderBottomWidth: 2,
              borderColor: colors.primary,
            }}
          />
        </SinglePressTouchable>
      </View>
    );
  }, [colors.primary, router, styles.row, styles.textInfo]);

  return (
    <RowLabel
      label={"Thay đổi mật khẩu"}
      Content={ChangePW}
      variant={"underline"}
    />
  );
});
UserChangePW.displayName = "UserChangePW";

export const UserDeleteAccount = React.memo(() => {
  const { colors } = useAppContext();
  const DeleteAccount = useCallback(
    () => (
      <MaterialIconsIcon name="delete-forever" size={24} color={colors.red} />
    ),
    [colors.red]
  );

  return (
    <RowLabel
      label={"Xóa tài khoản"}
      Content={DeleteAccount}
      variant={"underline"}
      labelStyle={{ color: colors.red }}
    />
  );
});
UserDeleteAccount.displayName = "UserDeleteAccount";

export const UserLogout = React.memo(() => {
  const router = useRouter();

  const Logout = useCallback(() => {
    const onLogout = () => {
      router.replace("/screens/login/login");
    };

    return (
      <SinglePressTouchable onPress={onLogout}>
        <AntDesignIcon name="logout" size={24} />
      </SinglePressTouchable>
    );
  }, [router]);

  return (
    <RowLabel label={"Đăng xuất"} Content={Logout} variant={"underline"} />
  );
});
UserLogout.displayName = "UserLogout";

export const HeaderPhone = React.memo(() => {
  const { colors, sizes } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);
  return (
    <View style={styles.headphones}>
      <FontAwesomeIcon name="headphones" color={colors.white} size={32} />
    </View>
  );
});
HeaderPhone.displayName = "HeaderPhone";

const createStyles = (colors: typeof defaultColors, size: typeof sizes) =>
  StyleSheet.create({
    userAvataContent: {
      position: "absolute",
      top: 80,
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
    label: {
      fontSize: size.fontSize.sm,
      color: colors.gray,
      fontWeight: size.fontWeight.bold as "bold",
      textTransform: "uppercase",
      opacity: 0.3,
    },
    textInfo: {
      fontWeight: size.fontWeight.bold as "bold",
      fontSize: size.fontSize.md,
      color: colors.primary,
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
    containerEmail: {
      borderRadius: size.borderRadius.sm,
      padding: size.padding.md,
      borderBottomWidth: sizes.borderWidth.xs,
      borderColor: colors.border,
    },
    contentEmail: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    containerRow: {
      flexDirection: "row",
      borderRadius: size.borderRadius.sm,
      justifyContent: "space-between",
      alignItems: "center",
      padding: size.padding.md,
      borderWidth: 0,
      borderBottomWidth: sizes.borderWidth.xs,
      borderColor: colors.border,
    },
    labelRow: {
      fontSize: size.fontSize.md,
      textTransform: "uppercase",
    },
    textError: {
      alignSelf: "flex-end",
      marginTop: sizes.margin.sm,
      fontSize: sizes.fontSize.md,
      color: colors.red,
    },
  });
