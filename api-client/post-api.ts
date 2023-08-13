import {
  FeedItemProps,
  ListParams,
  ListResponse,
  PayloadUpdatePost,
} from "@/models";
import axiosClient from "./axios-client";
import { PayloadCreatePost } from "@/models";
export const postApi = {
  getAll(params: Partial<ListParams>): Promise<ListResponse<FeedItemProps>> {
    return axiosClient.get("/post", { params });
  },
  get(id: string): Promise<ListResponse<FeedItemProps>> {
    return axiosClient.get(`/post/${id}`);
  },
  create(payload: PayloadCreatePost): Promise<ListResponse<FeedItemProps>> {
    return axiosClient.post(`/post/create`, payload);
  },
  update(
    payload: PayloadUpdatePost,
    id: string,
  ): Promise<ListResponse<FeedItemProps>> {
    return axiosClient.patch(`/post/update/${id}`, payload);
  },
};
