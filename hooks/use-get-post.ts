import { commentApi } from "@/api-client";
import { PayloadCommentCreate } from "@/models";
import useSWR from "swr";
export function useGetPost(id: string) {
  const { data, mutate, error } = useSWR(`/post/${id}`);
  const comment = async (payload: PayloadCommentCreate) => {
    try {
      await commentApi.create(payload);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  return {
    postDetail: data?.data,
    comment,
  };
}
