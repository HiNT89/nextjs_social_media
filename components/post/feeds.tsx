import React, { useCallback, useState, memo } from "react";
import { Button, Stack, Box } from "@mui/material";
import { FeedItem } from "./feedItem";
import { CreateFeed } from "./createFeed";
import {
  FeedItemProps,
  PayloadCommentCreate,
  PayloadUpdatePost,
} from "@/models";
import FormDialog from "./modalPost";
import PostDetail from "./postDetail";
import { useGetPost } from "@/hooks";
const Feeds = ({
  data,
  incrementPage,
  
}: {
  data: Array<FeedItemProps>;
  incrementPage: () => void;
  
}) => {
  const [open, setOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [postID, setPostID] = useState("");
  const { postDetail } = useGetPost(postID);
  const handleOpenDetail = useCallback((postID: string) => {
    setIsOpenDetail(true);
    setPostID(postID);
  }, []);
  const handleCloseDetail = useCallback(() => {
    setIsOpenDetail(false);
  }, []);
  const toggle = useCallback((value: boolean) => {
    setOpen(value);
  }, []);
  return (
    <Stack
      component={"article"}
      sx={{
        width: { xs: "100%", lg: "70%" },
        borderRadius: "12px",
        p: {
          xs: 1,
          md: 2,
        },
      }}
      bgcolor={"primary.dark"}
      gap={4}
      direction={"column"}
      maxHeight={{ xs: "calc(100vh - 120px)", md: "calc(100vh - 74px)" }}
      overflow={"auto"}
      className="customScroll"
    >
      <CreateFeed toggle={toggle} />

      {data.map((feed, index) => (
        <FeedItem
          key={index}
          data={feed}
          handleOpenDetail={handleOpenDetail}
         
        />
      ))}
      <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
        <Button variant="contained" color="primary" onClick={incrementPage}>
          learn more
        </Button>
      </Stack>
      <FormDialog open={open} toggle={toggle} />
      <PostDetail
        open={isOpenDetail}
        dataDetail={postDetail}
        handleCloseDetail={handleCloseDetail}
      />
    </Stack>
  );
};
export { Feeds };
