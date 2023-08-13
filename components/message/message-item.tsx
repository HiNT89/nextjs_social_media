import { Stack, Typography, Box, Avatar } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/hooks";
export function MessageItem({
  data,
  isOnline,
}: {
  data: any;
  isOnline: boolean;
}) {
  const { user } = useAuth();
  const { content, createdAt, userID, _id, reply } = data;
  return (
    <Stack
      direction={user._id !== userID._id ? "row" : "row-reverse"}
      gap={2}
      alignItems={"center"}
      flexWrap={"wrap"}
    >
      <Box>
        <Avatar alt={userID?.lastName}>
          <Image src={userID?.avatar} alt="avatar" width={60} height={60} />
        </Avatar>
      </Box>
      <Box maxWidth="calc(100% - 60px)">
        {reply !== null ? (
          <Typography
            component="p"
            sx={{
              display: "block",
              backgroundColor: "#f6f9fa",
              color: "#ccc",
              py: 0.5,
              px: 1,
              borderRadius: "12px",
              transform: userID?.avatar
                ? "translate(10px,5px)"
                : "translate(-10px,5px)",
            }}
          >
            {reply || ""}
          </Typography>
        ) : (
          ""
        )}
        <Stack direction="column">
          <Stack
            component={"p"}
            direction={"row"}
            sx={{
              justifyContent: userID?.avatar ? "left" : "right",
            }}
          >
            <Typography
              component="span"
              sx={{
                color: userID?.avatar ? "#000" : "#fff",
                py: 0.5,
                px: 1,
                borderRadius: "12px",
                zIndex: "1",
                position: "relative",
                backgroundColor: userID?.avatar ? "#e4e6eb" : "primary.main",
                boxShadow: "5px 5px 5px #ccc",
              }}
              maxWidth={"100%"}
            >
              {content}
            </Typography>
          </Stack>
          <Typography
            component="p"
            sx={{
              backgroundColor: "transparent",
              p: 0.5,
              fontSize: "0.7rem",
              color: "text.secondary",
            }}
          >
            {createdAt}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
