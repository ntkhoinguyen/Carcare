import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { useAppContext } from "@/src/useHook/useAppContext";
import { defaultColors } from "@/src/themes/colors";
import { sizes } from "@/src/themes/sizes";
import {
  FontAwesomeIcon,
  MaterialIconsIcon,
  FontAwesome6Icon,
} from "@/src/components/icon";
import {
  AttachmentPickerType,
  OptionImageType,
  RenderCameraType,
} from "@/src/utils/types";
import { useModal } from "@/src/useHook/useModal";
import { SinglePressTouchable } from "@/src/components/SinglePressTouchable";

export const AttachmentPicker = (props: AttachmentPickerType) => {
  const { colors, sizes, t } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  const { RenderItem, multiple } = props;

  const { open, close, RenderModal } = useModal({
    title: t("selectImage"),
    animationType: "slide",
    containerStyle: { justifyContent: "center" },
    contentStyle: { height: 200 },
    content: (props: any) => (
      <RenderOptionImage onImage={onImage} onFolder={onFolder} />
    ),
  });

  const {
    open: openImage,
    close: closeImage,
    RenderModal: RenderModalImage,
  } = useModal({
    title: t("takeAPhoto"),
    animationType: "slide",
    contentStyle: { height: "100%" },
    content: (props: any) => <RenderCamera onSelect={onSelectImage} />,
  });

  const onPress = () => {
    open();
  };

  const onImage = () => {
    close();
    openImage();
  };

  const pickDocument = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (result && result.assets) {
        if (result.assets.length === 0) {
          Alert.alert("Vui lòng chọn 1 hình ảnh");
        } else {
          let uris: any[] = [];
          if (multiple) {
            uris = result.assets.map((a) => {
              return a.base64;
            });
          } else {
            uris = [result.assets[0].base64];
          }
          return uris;
        }
      } else {
        Alert.alert("Không chọn được hình ảnh");
        return [];
      }

      console.log("kiem tra réul", result);
    } catch (error) {
      console.log("[attachmentPicker][pickDocument] ----> ", error);
      Alert.alert("Không chọn được hình ảnh");
      return [];
    }
  };

  const onFolder = async () => {
    close();
    setTimeout(async () => {
      const uris = await pickDocument();
      props.onSelect(uris || []);
    }, 100);
  };

  const onSelectImage = (uri: string) => {
    closeImage();
    props.onSelect([uri]);
  };

  return (
    <SinglePressTouchable
      testID="ModalInputSelection"
      onPress={onPress}
      style={styles.container}
    >
      {RenderItem ? (
        <RenderItem />
      ) : (
        <FontAwesomeIcon name="camera" size={14} color={colors.gray} />
      )}

      {RenderModal()}
      {RenderModalImage()}
    </SinglePressTouchable>
  );
};

const RenderOptionImage = (props: OptionImageType) => {
  const { colors, sizes, t } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  const onImagePress = () => {
    props.onImage();
  };

  const onFolderPress = () => {
    props.onFolder();
  };

  return (
    <View style={styles.OptionsContainer}>
      <Text>Vui lòng chọn hình ảnh</Text>
      <View style={styles.btFooter}>
        <TouchableOpacity
          style={styles.optionItemContent}
          onPress={onImagePress}
        >
          <View style={styles.optionItem}>
            <Text style={styles.optionItemText}>{t("takeAPhoto")}</Text>
            <FontAwesomeIcon
              name="camera"
              size={24}
              color={colors.light_gray}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItemContent}
          onPress={onFolderPress}
        >
          <View style={styles.optionItem}>
            <Text style={styles.optionItemText}>{t("folder")}</Text>
            <FontAwesomeIcon name="photo" size={24} color={colors.light_gray} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RenderCamera = (props: RenderCameraType) => {
  const { colors, sizes, t } = useAppContext();
  const styles = useMemo(() => createStyles(colors, sizes), [colors, sizes]);

  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<"on" | "off" | "auto">("off");
  const [uri, setUri] = useState<string | null>(null);

  const cameraRef = React.useRef<CameraView>(null);

  const toggleCameraFacing = () => {
    if (facing === "back") {
      setFlashMode("off");
    }
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashMode = () => {
    setFlashMode((current) => (current === "on" ? "off" : "on"));
  };

  const onCancel = () => {
    setUri(null);
  };

  const onSave = () => {
    props.onSelect(uri || "");
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>{t("needPermissionCamera")}</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.grantPermission}>{t("grantPermission")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onTakeAPhoto = async () => {
    try {
      if (cameraRef.current) {
        const result = await cameraRef.current?.takePictureAsync?.({
          shutterSound: false,
        });
        if (result.uri) {
          setUri(result.uri);
        } else {
          Alert.alert(t("cannotTakeAPicture"));
        }
      } else {
        Alert.alert(t("cannotTakeAPicture"));
      }
    } catch (error) {
      Alert.alert(t("cannotTakeAPicture"));
      console.error("[camera][onTakeAPhoto] ----", error);
    }
  };

  return (
    <View style={styles.CameraContainer}>
      {uri ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: uri }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.actionCancelContent}>
            <TouchableOpacity onPress={onCancel}>
              <MaterialIconsIcon name="cancel" size={32} color={colors.gray} />
            </TouchableOpacity>
          </View>
          <View style={styles.actionSaveContent}>
            <TouchableOpacity onPress={onSave}>
              <FontAwesome6Icon
                name="circle-check"
                size={40}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          flash={flashMode}
          animateShutter={false}
        >
          <View style={styles.buttonContainer}>
            <View style={styles.rightButtons}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <MaterialIconsIcon
                  name="flip-camera-ios"
                  size={32}
                  color={colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleFlashMode}
                disabled={facing === "front"}
              >
                <MaterialIconsIcon
                  name={flashMode === "on" ? "flash-on" : "flash-off"}
                  size={32}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonTake} onPress={onTakeAPhoto}>
              <FontAwesomeIcon name="camera" size={32} color={colors.white} />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

const createStyles = (colors: typeof defaultColors, size: typeof sizes) => {
  return StyleSheet.create({
    container: {},
    OptionsContainer: {
      flex: 1,
      alignItems: "center",
      paddingVertical: size.padding.sm,
      gap: size.margin.xxl,
    },
    optionItemContent: {
      alignItems: "center",
      justifyContent: "center",
      gap: size.margin.sm,
    },
    btFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
      marginTop: sizes.margin.lg,
    },
    optionItem: {
      borderWidth: size.borderWidth.xs,
      borderRadius: size.borderRadius.xl,
      borderColor: colors.border,
      padding: size.padding.md,
      paddingVertical: sizes.padding.sm,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.light,
      flexDirection: "row",
    },
    optionItemText: {
      fontSize: size.fontSize.lg,
      color: colors.primary,
      marginRight: sizes.margin.sm,
      fontWeight: sizes.fontWeight.bold as "bold",
    },
    permissionContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: size.margin.lg,
    },
    permissionText: {
      fontSize: size.fontSize.xl,
      color: colors.orange,
    },
    grantPermission: {
      padding: size.padding.md,
      borderWidth: size.borderWidth.xs,
      borderRadius: size.borderRadius.xs,
      borderColor: colors.border,
      backgroundColor: colors.primary,
      color: colors.white,
      fontWeight: size.fontWeight.bold as "bold",
      fontSize: size.fontSize.md,
    },
    CameraContainer: {
      flex: 1,
    },

    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: "transparent",
      margin: sizes.margin.lg,
      alignItems: "center",
    },
    rightButtons: {
      flex: 1,
      width: "100%",
      alignItems: "flex-end",
    },
    button: {
      marginTop: sizes.margin.xl,
    },
    buttonTake: {
      alignSelf: "center",
      marginBottom: sizes.margin.xxl,
    },
    imageContainer: {
      flex: 1,
    },
    image: {
      height: "100%",
      width: "100%",
    },
    actionSaveContent: {
      position: "absolute",
      width: "100%",
      alignItems: "center",
      bottom: sizes.margin.lg,
    },
    actionCancelContent: {
      position: "absolute",
      width: "100%",
      top: 0,
      alignItems: "flex-end",
      padding: sizes.padding.sm,
    },
  });
};
