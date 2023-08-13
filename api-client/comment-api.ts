import axiosClient from "./axios-client";
import { PayloadCommentCreate } from "@/models";
export const commentApi = {
  create(payload: PayloadCommentCreate): Promise<void> {
    return axiosClient.post(`/comment/create`, payload);
  },
};
