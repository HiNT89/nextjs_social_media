import { Stack, Box, Avatar, Typography, Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { MessageItem } from "./message-item";
import { useRouter } from "next/router";
import { useAuth, useMessageDetail } from "@/hooks";
import SendContent from "../common/send-content";
export function BoxMessage({
  data,
  value,
  handleOnChange,
  handleSubmit,
  notification,
}: {
  data?: any;
  notification?: string;
  handleOnChange: (value: string) => void;
  value: string;
  handleSubmit: () => void;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const dataFriend = data?.users?.filter((it: any) => it._id !== user._id)[0];
  const dataMessage = data?.message?.map((it: any) => {
    const userItem = data?.users?.filter((x: any) => x._id === it.userID)[0];
    return {
      ...it,
      userID: userItem,
    };
  });

  if (notification)
    return (
      <Stack
        component={"p"}
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          width: "65%",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "5px 5px 5px 5px #ccc",
          overflow: "auto",
          textTransform: "capitalize",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        {notification}
      </Stack>
    );
  return (
    <Stack
      component="article"
      sx={{
        width: { xs: "100%", sm: "65%" },
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: { sm: "5px 5px 5px 5px #ccc" },
        overflow: "auto",
      }}
      minHeight="100%"
      className="customScroll"
    >
      <Stack direction="row" p={2} gap={2} alignItems="center">
        <Avatar>
          <Image
            src={dataFriend?.avatar || ""}
            alt={dataFriend?.lastName || ""}
            width={40}
            height={40}
          />
        </Avatar>

        <Typography
          component={"h4"}
          sx={{
            textTransform: "capitalize",
            fontWeight: "600",
          }}
        >
          {dataFriend?.firstName +
            " " +
            dataFriend?.middleName +
            " " +
            dataFriend?.lastName}
        </Typography>

        <Button
          variant="contained"
          sx={{
            display: { xs: "block", sm: "none" },
          }}
          onClick={() => {
            router.push("/message");
          }}
        >
          back
        </Button>
      </Stack>
      <Stack
        direction="column"
        sx={{
          borderTop: 1,
          borderBottom: 1,
          overflow: "auto",
          px: 2,
          py: 1,
        }}
        height={"calc(100% - 135px)"}
      >
        {(dataMessage || []).map((item: any) => (
          <MessageItem
            key={item.messageID}
            data={item}
            isOnline={data?.isOnline || true}
          />
        ))}
      </Stack>
      <Box px={2} pt={2}>
        <SendContent
          placeholder="Send message..."
          value={value}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Stack>
  );
}
