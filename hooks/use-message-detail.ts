import { apiMessage } from "@/api-client";
import { PayloadSendMessage } from "@/models";
import useSWR from "swr";
export const useMessageDetail = (messageID: string | string[] | undefined) => {
  const { data, mutate, error } = useSWR(`/message/${messageID}`);
  const handleSendMessage = async (payload: PayloadSendMessage) => {
    try {
      await apiMessage.send(payload);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  return {
    messageDetail: data?.data,
    handleSendMessage,
  };
};
