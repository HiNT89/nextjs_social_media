import { Stack, Avatar, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { TYPE_POST } from "./typePost";
import { useAuth } from "@/hooks";

export function CreateFeed({ toggle }: { toggle: any }) {
  const { user } = useAuth();
  return (
    <Stack
      component={"section"}
      direction={"column"}
      gap={2}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        p: "8px",
      }}
    >
      <Stack direction={"row"} gap={2}>
        <Avatar alt={user?.lastName}>
          <Image src={user?.avatar} alt="avatar" width={60} height={60} />
        </Avatar>
        <Button
          variant="text"
          color="primary"
          sx={{
            textTransform: "capitalize",
            flexGrow: "1",
            borderRadius: "8px",
            backgroundColor: "#f6f7f8 !important",
            color: "#b4ccb5",
          }}
          onClick={() => toggle(true)}
        >
          What&apos;s happening ?
        </Button>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        textTransform={"capitalize"}
      >
        {TYPE_POST.map((item) => (
          <Stack key={item.label} direction={"row"} gap={2}>
            {item.icon}
            <Typography
              component={"span"}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
