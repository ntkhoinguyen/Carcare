import { TextInputProps } from "react-native";

// --------------- header ------------------------
export type DetailHeaderType = {
  options: {
    title?: string;
    leftOptions: string[];
    rightOptions: string[];
  };
} & any;

export type LeftDetailHeader = {
  title?: string;
  leftOptions: string[];
};

export type RightDetailHeader = {
  rightOptions: string[];
};

// ----------------------------- Icon Symbol -----------------------------
export type IconType = {
  name: string;
  size?: number;
  color?: string;
  style?: object;
};

// ----------------------------- Button Field -----------------------------
export type ButtonFieldType = {
  text?: string;
  containerStyle?: object;
  type: "fill" | "outline" | "text";
  color?: string;
  disabled?: boolean;
  LeftSection?: React.ComponentType<any>;
  RightSection?: React.ComponentType<any>;
  onPress?: () => void;
};

// ---------------------------- Input Field -----------------------------
export type InputFieldProps = TextInputProps & {
  ref?: any;
  label?: string;
  labelIcon?: string;
  value: string;
  required?: boolean;
  errorText?: string;
  type?: "default" | "email" | "password" | "phone";
  borderType?: "default" | "under" | "none";
  placeholder?: string;
  editable?: boolean;
  containerStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
  multiline?: boolean;
  LeftSection?: React.ComponentType<any>;
  RightSection?: React.ComponentType<any>;
  validator?: (text: string) => string | undefined;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPress?: () => void;
};

// ------------------ user info ----------------------
export type userType = {
  username: string;
  password: string;
};

export type userInfoType = {
  name: string;
  birthday: string;
  email: string;
  phone: string;
  loginFaceId: boolean;
  avatar: string;
};

// ---------------------------- Component Props -----------------------------
export type AppLogoType = {
  isEffect?: boolean;
};

export type LoadingIconType = {
  size: "verySmall" | "small" | "medium" | "large";
  color?: string;
  containerStyle?: object;
};

export type AttachmentPickerType = {
  type?: string;
  multiple?: boolean;
  onSelect: (uri: string[]) => void;
  RenderItem?: React.ComponentType<any>;
};

export type OptionImageType = {
  onImage: () => void;
  onFolder: () => void;
};

export type RenderCameraType = {
  onSelect: (uri: string) => void;
};

export type ModalData = {
  title: string;
  animationType: "none" | "slide" | "fade";
  content: React.ComponentType<any>;
  containerStyle?: object;
  contentStyle?: object;
  onClose?: () => void;
};

export type ModalWrapperProps = {
  children: React.ReactNode;
  visible?: boolean;
  title?: string;
  animationType?: "none" | "slide" | "fade";
  containerStyle?: object;
  modalContentStyle?: object;
  onClose?: () => void;
};

export type ModalAttachmentType = {
  animationType: "none" | "slide" | "fade";
  containerStyle?: object;
};

export type AttachmentsType = {
  uri: string[];
  onPreview?: (uri: string) => void;
  onDelete?: (uri: string) => void;
};

export type AttachmentType = {
  uri: string;
  onPreview?: (uri: string) => void;
  onDelete?: (uri: string) => void;
};

export type RenderUserAvataType = {
  url?: string;
  haveAvatar?: "edit" | "readonly";
  containerStyles?: object;
};
