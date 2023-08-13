import { apiUser } from "@/api-client";
import { PayloadAddFriend, PayloadUnFriend } from "@/models";
import useSWR from "swr";
export const useUser = () => {
  const { data, mutate, error } = useSWR("/user/friends");
  
  const handleAddFriend = async (payload: PayloadAddFriend) => {
    try {
      await apiUser.addFriend(payload);
      mutate();
    } catch (e) {}
  };
  const handleUnFriend = async (payload: PayloadUnFriend) => {
    try {
      await apiUser.unFriend(payload);
      mutate();
    } catch (e) {}
  };
  return {
    friend: data?.data,
    handleAddFriend,
    handleUnFriend,
  };
};
