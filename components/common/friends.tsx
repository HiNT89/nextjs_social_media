import React from "react";
import { MoreHoriz } from "@mui/icons-material";
import { Box, Typography, Stack, Button, Avatar } from "@mui/material";
import { useAuth, useMessage, useUser } from "@/hooks";
import Image from "next/image";
import { FriendsProps, PayloadUnFriend } from "@/models";
export function Friends() {
  const { friend } = useUser();
  return (
    <Stack
      component={"aside"}
      direction={"column"}
      width={"30%"}
      overflow={"auto"}
      maxHeight={"calc(100vh - 74px)"}
      className="customScroll"
      sx={{
        display: { xs: "none", sm: "flex" },
      }}
    >
      <Box py={1} px={1}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            component={"b"}
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            friends
          </Typography>
          <Button>
            <MoreHoriz />
          </Button>
        </Stack>
        <Stack direction={"column"} gap={1}>
          {friend?.friends.map((friendItem: FriendsProps) => (
            <Stack
              direction={"row"}
              key={friendItem?._id}
              gap={2}
              sx={{
                textTransform: "capitalize",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <Avatar alt={friendItem?.lastName}>
                <Image
                  src={friendItem?.avatar}
                  alt="avatar"
                  width={60}
                  height={60}
                />
              </Avatar>

              <Typography>
                {friendItem?.firstName +
                  " " +
                  friendItem?.middleName +
                  " " +
                  friendItem?.lastName}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
