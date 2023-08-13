import { postApi } from "@/api-client";
import { FeedItemProps, PayloadCreatePost, PayloadUpdatePost } from "@/models";
import { commentApi } from "@/api-client";
import { PayloadCommentCreate } from "@/models";
import { useState } from "react";
import useSWR from "swr";
interface Params {
  _page?: number;
  _limit?: number;
}
export function usePost(params?: Params) {
  // post
  const { data, mutate, error } = useSWR(
    `/post?_page=${params?._page || 1}&_limit=${params?._limit || 5}`,
  );
  
  const firstLoading = data === undefined && error === undefined;
  const handleCreate = async (payload: PayloadCreatePost) => {
    try {
      await postApi.create(payload);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = async (payload: PayloadUpdatePost, id: string) => {
    try {
      await postApi.update(payload, id);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  const comment = async (payload: PayloadCommentCreate) => {
    try {
      await commentApi.create(payload);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    postList: data?.data,
    error,
    firstLoading,
    handleCreate,
    handleUpdate,
    comment,
  };
}
