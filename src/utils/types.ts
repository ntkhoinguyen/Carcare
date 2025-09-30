import { TextInputProps } from "react-native";

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


// ---------------------------- Component Props -----------------------------
export type AppLogoType = {
  isEffect?: boolean;
};

export type LoadingIconType = {
  size: "verySmall" | "small" | "medium" | "large";
  color?: string;
  containerStyle?: object;
};
