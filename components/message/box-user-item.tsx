import { BoxUserItemProps } from "@/models";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ListMessage } from "@/hooks";
export function BoxUserItem({
  data,
  isActive,
}: {
  data: ListMessage;
  isActive: boolean;
}) {
  const dataFriend = data.users.filter((x) => !!x)[0];
  const router = useRouter();
  const handlerOnclick = (boxMessageID: string) => {
    router.push(`/message/${boxMessageID}`);
  };
  return (
    <Stack
      direction={"row"}
      gap={1}
      p={1}
      sx={{
        backgroundColor: isActive ? "#ccc" : "#fff",
        borderRadius: "6px",
        cursor: "pointer",
      }}
      alignItems={"center"}
      onClick={() => handlerOnclick(data._id)}
    >
      <Avatar alt={dataFriend?.lastName}>
        <Image src={dataFriend?.avatar} alt="avatar" width={60} height={60} />
      </Avatar>

      <Stack direction="column" flexGrow={1}>
        <Typography
          component={"h3"}
          sx={{
            textTransform: "capitalize",
            fontWeight: "500",
            fontSize: { xs: "1.2rem", md: "0.9rem" },
          }}
        >
          {dataFriend?.firstName +
            " " +
            dataFriend?.middleName +
            " " +
            dataFriend?.lastName}
        </Typography>
        <Typography
          component={"span"}
          sx={{
            fontSize: { xs: "1rem", md: "0.8rem" },
            color: "text.secondary",
          }}
        >
          {data?.message?.content}
        </Typography>
      </Stack>
      <Stack direction="column" alignItems={"center"}>
        <Typography
          component={"span"}
          sx={{
            fontSize: "0.8rem",
            color: "text.primary",
            textTransform: "uppercase",
          }}
        >
          {data?.message?.createdAt}
        </Typography>
      </Stack>
    </Stack>
  );
}
