import React, { useCallback, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FavoriteBorder, Comment, Reply } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FeedDetailProps, PayloadCommentCreate } from "@/models";
import { useAuth, useGetPost, usePost } from "@/hooks";
import { handleLikePost } from "@/utils/post";
import { showTimeStart } from "@/utils";
import SendContent from "../common/send-content";

export default function PostDetail({
  open,
  dataDetail,
  handleCloseDetail,
}: {
  open: boolean;
  dataDetail: FeedDetailProps;
  handleCloseDetail: () => void;
}) {
  const { user } = useAuth();
  const { handleUpdate } = usePost();
  const { comment } = useGetPost(dataDetail?._id);
  const [dataComment, setDataComment] = useState("");
  const [reply, setReply] = useState("");
  const handleOnChange = useCallback((value: string): void => {
    setDataComment(value);
  }, []);
  const handleComment = useCallback(() => {
    const payload: PayloadCommentCreate = {
      commentContent: dataComment,
      reply: "",
      postID: dataDetail._id,
    };
    comment(payload);
    setDataComment("");
  }, [user, dataComment, dataDetail, reply]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDetail}
        style={{ minWidth: "80%" }}
      >
        <DialogTitle sx={{ fontSize: "2rem", color: "#4b8aff" }}>
          Feed
        </DialogTitle>

        <Stack
          direction={"column"}
          component={"section"}
          gap={2}
          sx={{
            backgroundColor: "#fff",
            p: 2,
            borderRadius: "8px",
            minWidth: {
              sm: "700px",
            },
          }}
        >
          {/* info user */}
          <Stack direction="row" alignItems={"center"} gap={2}>
            <Avatar alt={dataDetail?.userID?.lastName}>
              <Image
                src={dataDetail?.userID?.avatar}
                alt="avatar"
                width={60}
                height={60}
              />
            </Avatar>

            <Box flexGrow={1}>
              <Typography
                component={"h3"}
                variant="h6"
                sx={{ textTransform: "capitalize" }}
              >
                {dataDetail?.userID?.firstName +
                  " " +
                  dataDetail?.userID?.middleName +
                  " " +
                  dataDetail?.userID?.lastName}
              </Typography>
              <Typography component={"span"} sx={{ color: "text.secondary" }}>
                {showTimeStart(dataDetail?.createdAt)}
                {"." + dataDetail?.type}
              </Typography>
            </Box>
          </Stack>
          {/* media  */}
          <Box component={"figure"}>
            <Typography component={"p"} mb={2} textAlign={"justify"}>
              {dataDetail?.description}
            </Typography>
            <Image
              alt="feed"
              src={dataDetail?.mediaURL}
              width={"607"}
              height={"300"}
              style={{
                objectFit: "contain",
                borderRadius: "8px",
                width: "100%",
                display: dataDetail?.mediaURL ? "block" : "none",
              }}
            />
          </Box>
          {/* emotion */}
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>{dataDetail?.interaction?.like.length} like</Typography>
            <Typography>{dataDetail?.commentIDs?.length} comments</Typography>
            <Typography>
              {dataDetail?.interaction?.share.length} share
            </Typography>
          </Stack>
          {/* action emotion */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              borderTop: 1,
              borderBottom: 1,
            }}
          >
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                const { like, share } = dataDetail?.interaction;
                const newLike = handleLikePost(like, user?._id);
                handleUpdate(
                  {
                    interaction: {
                      like: newLike,
                      share,
                    },
                  },
                  dataDetail?._id,
                );
              }}
              sx={{
                color: dataDetail?.interaction?.like.includes(user?._id)
                  ? "red"
                  : "#ccc",
              }}
            >
              <FavoriteBorder />
              like
            </Button>
            <Button variant="text" color="secondary">
              <Comment />
              comment
            </Button>
            <Button disabled variant="text" color="secondary">
              <Reply />
              share
            </Button>
          </Stack>
          {/* comment */}
          <Stack direction="column" gap={2}>
            {(dataDetail?.commentIDs || []).map((it) => (
              <Stack key={it._id} direction="row" alignItems="center" gap={2}>
                <Avatar alt={it?.lastName}>
                  <Image src={it?.avatar} alt="avatar" width={60} height={60} />
                </Avatar>
                <Stack direction="column" gap={1} alignItems="flex-start">
                  <Box
                    component="p"
                    sx={{
                      backgroundColor: "text.primary",
                      px: 1,
                      py: 0.5,
                      borderRadius: "4px",
                      color: "#fff",
                      textTransform: "capitalize",
                    }}
                  >
                    {it?.comment}
                  </Box>
                  <Button
                    sx={{
                      fontSize: "0.5rem",
                      p: 0,
                      m: 0,
                      textTransform: "capitalize",
                    }}
                    disabled
                  >
                    phản hồi
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <SendContent
            handleOnChange={handleOnChange}
            value={dataComment}
            handleSubmit={handleComment}
            placeholder="Comment..."
          />
        </Stack>
      </Dialog>
    </div>
  );
}
