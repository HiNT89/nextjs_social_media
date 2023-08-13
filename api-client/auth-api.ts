import { PayloadLogin, PayloadSignup, PayloadUpdate } from "@/models";
import axiosClient from "./axios-client";

export const authApi = {
  signup(payload: PayloadSignup) {
    return axiosClient.post("/auth/signup", payload);
  },
  login(payload: PayloadLogin) {
    return axiosClient.post("/auth/signin", payload);
  },
  update(payload: PayloadUpdate) {
    return axiosClient.patch(`/user/update-info`, payload);
  },
  logout() {
    return axiosClient.get("/logout");
  },
};
