import { PayloadAddFriend, PayloadUnFriend, UpdateProfileThumbnail } from "@/models";
import axiosClient from "./axios-client";

export const apiUser = {
  addFriend(payload: PayloadAddFriend) {
    return axiosClient.patch("/user/add-friend", payload);
  },
  unFriend(payload: PayloadUnFriend) {
    return axiosClient.patch("/user/unfriend", payload);
  },
  updateProfile(payload: UpdateProfileThumbnail) {
    return axiosClient.patch("/user//update-profile", payload);
  },
};
