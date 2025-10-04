import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import moment from "moment";
import "moment/locale/vi";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { userInfoType } from "@/src/utils/types";
import { userLogo } from "@/assets/images/userLogoBase64";

moment.locale("vi");
type UserContextType = {
  user: userInfoType;
  setUser: (user: userInfoType) => void;
  saveUser: (user: userInfoType) => Promise<void>;
};

const userDefault = {
  name: "Nguyễn Trần Khôi Nguyên",
  birthday: "29/01/1995",
  email: "khnguyensp@gmail.com",
  phone: "0394114682",
  loginFaceId: true,
  avatar: userLogo,
};

const UserContext = createContext<UserContextType>({
  user: userDefault,
  setUser: () => {},
  saveUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userInfoType>(userDefault);

  useEffect(() => {
    const getUserInfo = async () => {
      const userStr = await AsyncStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.avatar === "") user.avatar = userDefault.avatar;
        setUser(user);
      }
    };

    getUserInfo();
  }, []);
  const saveUser = async (newUser: userInfoType) => {
    try {
      setUser(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("[userContext][saveUser]", error);
    }
  };

  const value = useMemo(() => ({ user, setUser, saveUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContext;
