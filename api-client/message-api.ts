import axiosClient from "./axios-client";
import { PayloadSendMessage } from "@/models";

export const apiMessage = {
  send(payload: PayloadSendMessage) {
    return axiosClient.post("/message/send", payload);
  },
};
