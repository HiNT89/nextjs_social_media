import { useEffect } from "react";
import useSWR from "swr";
interface MessageItemProps {
  _id: string;
  users: string[];
  message: {
    content: string;
    createdAt: string;
    reply: string | null;
    userID: string;
    _id: string;
  };
}
interface UserItem {
  _id: string;
  middleName: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: null;
  phoneNumber: string;
  avatar: string;
}
export interface ListMessage {
  _id: string;
  users: UserItem[];
  message: {
    content: string;
    createdAt: string;
    reply: string | null;
    userID: string;
    _id: string;
  };
}

export const useMessage = () => {
  const { data, mutate, error } = useSWR("/message");
  let result;

  if (data) {
    const listMessage: Array<MessageItemProps> = data?.data.messageID;
    const listUser = data?.data.friends;
    result = listMessage.map((it: MessageItemProps) => {
      const users = it?.users;
      const newUsers = users.map(
        (x) => listUser.filter((a: UserItem) => a._id === x)[0],
      );
      return {
        ...it,
        users: newUsers,
      };
    });
  }

  return {
    listMessage: result,
  };
};
