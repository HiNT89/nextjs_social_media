import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { Cake, Email, Person, Phone } from "@mui/icons-material";
import { ProfileInfoProps } from "@/models";
import { Feeds } from "../post/feeds";
export function ProfileInfo({ data }: { data: ProfileInfoProps }) {
  const { listPost, user, email, friends } = data;
  return (
    <Stack direction={{ xs: "column", lg: "row" }} gap={2}>
      <Box
        sx={{
          width: { xs: "100%", lg: "30%" },
          backgroundColor: "primary.dark",
          borderRadius: "12px",
          p: 2,
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{ textTransform: "capitalize", fontWeight: "600" }}
        >
          intro
        </Typography>
        <Stack
          direction={{ xs: "row", md: "column" }}
          component="ul"
          mt={2}
          flexWrap={"wrap"}
          gap={2}
        >
          <Stack
            direction="row"
            component="li"
            gap={1}
            sx={{
              textTransform: "capitalize",
              width: { xs: "40%", md: "100%" },
            }}
          >
            <Person />
            {user?.gender}
          </Stack>
          <Stack direction="row" component="li" gap={1}>
            <Email />
            {email}
          </Stack>
          <Stack
            direction="row"
            component="li"
            gap={1}
            sx={{
              textTransform: "capitalize",
              width: { xs: "40%", md: "100%" },
            }}
          >
            <Phone />
            {user?.phoneNumber}
          </Stack>{" "}
          <Stack
            direction="row"
            component="li"
            gap={1}
            sx={{
              textTransform: "capitalize",
              width: { xs: "40%", md: "100%" },
            }}
          >
            <Cake />
            {user?.birthday}
          </Stack>
          <Stack
            direction="row"
            component="li"
            gap={2}
            sx={{
              textTransform: "capitalize",
              width: { xs: "40%", md: "100%" },
            }}
          >
            <Typography>{friends?.length}</Typography>
            friend
          </Stack>
        </Stack>
      </Box>
      <Feeds data={listPost} incrementPage={() => {}} />
    </Stack>
  );
}
