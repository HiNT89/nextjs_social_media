import { apiUser } from "@/api-client";
import { UpdateProfileThumbnail } from "@/models";
import useSWR from "swr";
export const useProfile = (id: string | string[] | undefined) => {
  const { data, mutate, error } = useSWR(`/user/profile/${id}`);
  const handleUpdate = async (payload: UpdateProfileThumbnail) => {
    try {
      await apiUser.updateProfile(payload);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  return {
    profile: data?.data,
    handleUpdate,
  };
};
