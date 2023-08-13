import { authApi } from "@/api-client";
import { PayloadLogin, PayloadSignup, PayloadUpdate } from "@/models";
import userSWR from "swr";
import Cookies from "cookies";
export function useAuth() {
  const { data, mutate, error } = userSWR("/user");
  const signup = (payload: PayloadSignup) => {
    return authApi.signup(payload);
  };
  const firstLoading = data === undefined && error === undefined;
  const update = async (payload: PayloadUpdate) => {
    try {
      await authApi.update(payload);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  const login = async (payload: PayloadLogin) => {
    try {
      await authApi.login(payload);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  const logout = async () => {
    try {
      await authApi.logout();
      mutate(null);
    } catch (e) {
      console.log(e);
    }
  };
  return {
    user: data?.data,
    signup,
    login,
    firstLoading,
    logout,
    update,
  };
}
