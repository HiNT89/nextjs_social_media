import {
  MoreHoriz,
  FavoriteBorder,
  Comment,
  Reply,
  VisibilityOff,
  NotificationsActive,
  Report,
  PersonRemove,
} from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import {
  FeedItemProps,
  PayloadCommentCreate,
  PayloadUpdatePost,
} from "@/models";
import { useAuth, useUser } from "@/hooks";
import { handleLikePost } from "@/utils/post";
import { usePost } from "@/hooks/use-post";
import { checkAddFriend, showTimeStart } from "@/utils";
import SendContent from "../common/send-content";
export function FeedItem({
  data,
  handleOpenDetail,
}: {
  data: FeedItemProps;
  handleOpenDetail: (postID: string) => void;
}) {
  const { user } = useAuth();
  const { friend, handleAddFriend } = useUser();
  const { handleUpdate, comment } = usePost();
  const [dataComment, setDataComment] = useState("");
  const handleOnChange = useCallback((value: string): void => {
    setDataComment(value);
  }, []);
  const handleComment = useCallback((): void => {
    const payload: PayloadCommentCreate = {
      commentContent: dataComment,
      reply: "",
      postID: data._id,
    };
    comment(payload);
    setDataComment("");
  }, [dataComment, data, comment]);
  console.log("render feed item");
  return (
    <Stack
      direction={"column"}
      component={"section"}
      gap={2}
      sx={{ backgroundColor: "#fff", p: 2, borderRadius: "8px" }}
    >
      {/* info user */}
      <Stack direction="row" alignItems={"center"} gap={2}>
        <Avatar alt={data?.userID.lastName}>
          <Image
            src={data?.userID.avatar}
            alt="avatar"
            width={60}
            height={60}
          />
        </Avatar>

        <Box flexGrow={1}>
          <Stack direction={"row"} gap={2} alignItems="center">
            <Typography
              component={"h3"}
              variant="h6"
              sx={{ textTransform: "capitalize" }}
            >
              {data?.userID.firstName +
                " " +
                data?.userID.middleName +
                " " +
                data?.userID.lastName}
            </Typography>
            {checkAddFriend(friend, data?.userID._id) ? (
              ""
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleAddFriend({ users: [friend?._id, data?.userID._id] })
                }
              >
                add friend
              </Button>
            )}
          </Stack>

          <Typography component={"span"} sx={{ color: "text.secondary" }}>
            {showTimeStart(data.createdAt)}
            {"." + data?.type}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            cursor: "pointer",
            "&:hover div": {
              display: "block",
            },
          }}
        >
          <MoreHoriz />
          <Stack
            direction="column"
            sx={{
              display: "none",
              position: "absolute",
              right: "0",
              bottom: "0",
              transform: "translateY(95%)",
              backgroundColor: "#fff",
              boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)",
              borderRadius: "6px",
              width: "250px",
            }}
          >
            <Button
              sx={{
                fontSize: "0.8rem",
                color: "#000",
                textTransform: "capitalize",
                display: "flex",
                gap: "0px 8px",
                "&:hover": {
                  color: "#377dff",
                },
              }}
            >
              <VisibilityOff />
              hide post
            </Button>
            <Button
              sx={{
                fontSize: "0.8rem",
                color: "#000",
                textTransform: "capitalize",
                display: "flex",
                gap: "0px 8px",
                "&:hover": {
                  color: "#377dff",
                },
              }}
            >
              <NotificationsActive />
              turn on notification for this post
            </Button>
            <Button
              sx={{
                fontSize: "0.8rem",
                color: "#000",
                textTransform: "capitalize",
                display: "flex",
                gap: "0px 8px",
                "&:hover": {
                  color: "#377dff",
                },
              }}
            >
              <Report />
              report this post
            </Button>
            <Button
              sx={{
                fontSize: "0.8rem",
                color: "#000",
                textTransform: "capitalize",
                display: "flex",
                gap: "0px 8px",
                "&:hover": {
                  color: "#377dff",
                },
              }}
            >
              <PersonRemove />
              unfollow
            </Button>
          </Stack>
        </Box>
      </Stack>
      {/* media  */}
      <Box component={"figure"}>
        <Typography component={"p"} mb={2} textAlign={"justify"}>
          {data?.description}
        </Typography>
        <Image
          alt="feed"
          src={data?.mediaURL}
          width={"607"}
          height={"300"}
          style={{
            objectFit: "contain",
            borderRadius: "8px",
            width: "100%",
            display: data?.mediaURL ? "block" : "none",
          }}
        />
      </Box>
      {/* emotion */}
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>{data?.interaction.like.length} like</Typography>
        <Typography>{data?.commentIDs?.length} comments</Typography>
        <Typography>{data?.interaction.share.length} share</Typography>
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
            const { like, share } = data?.interaction;
            const newLike = handleLikePost(like, user?._id);
            handleUpdate(
              {
                interaction: {
                  like: newLike,
                  share,
                },
              },
              data?._id,
            );
          }}
          sx={{
            color: data?.interaction.like.includes(user?._id) ? "red" : "#ccc",
          }}
        >
          <FavoriteBorder />
          like
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => handleOpenDetail(data?._id)}
        >
          <Comment />
          comment
        </Button>
        <Button disabled variant="text" color="secondary">
          <Reply />
          share
        </Button>
      </Stack>
      {/* comment */}
      <SendContent
        handleOnChange={handleOnChange}
        value={dataComment}
        handleSubmit={handleComment}
        placeholder="Comment..."
      />
    </Stack>
  );
}
