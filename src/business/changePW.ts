import * as SecureStore from "expo-secure-store";

export const ChangePassword = async (
  oldPW: string,
  newPW: string,
  reNewPW: string
) => {
  // for TEST!!!
  try {
    const user = await SecureStore.getItemAsync("admin");
    const userInfo = JSON.parse(user!);
    if (userInfo.password !== oldPW) {
      return {
        pwEror: "Không đúng mật khẩu",
        newPWError: "",
        status: "failed",
      };
    }

    if (newPW !== reNewPW) {
      return {
        pwEror: "",
        newPWError: "Mật khẩu mới không khớp",
        status: "failed",
      };
    }
    userInfo.password = newPW;
    await SecureStore.setItemAsync("admin", JSON.stringify(userInfo));
    return { pwEror: "", newPWError: "", status: "done" };
  } catch (error) {
    console.log("[ERROR] ChangePassword --->", error);
    return {
      pwEror: "",
      newPWError: "Không thể cập nhật mật khẩu mới",
      status: "failed",
    };
  }
};
