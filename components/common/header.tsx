import {
  Box,
  Stack,
  Link as MuiLink,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import Image from "next/image";
// import { SearchBox } from "@/components/common/index";
import React from "react";
import { useAuth } from "@/hooks";

export function Header() {
  const { user } = useAuth();

  return (
    <Stack
      component="header"
      sx={{
        width: "100%",
        alignItems: "center",
        px: {
          xs: "8px",
          sm: "20px",
        },
      }}
      direction="row"
    >
      <Box
        component={"div"}
        width={"20%"}
        sx={{
          p: "12px 0px",
          textTransform: "uppercase",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
          },
          fontWeight: "bold",
        }}
      >
        <MuiLink href="/">hint</MuiLink>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width={"80%"}
        sx={{
          p: "12px 0px",
        }}
      >
        {/* <SearchBox
          placeholder="Search for something here..."
          widthValue="40%"
        /> */}
       
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          flexGrow={1}
          justifyContent={"flex-end"}
        >
          <Typography
            component="b"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: {
                xs: "0.8rem",
                sm: "1.1rem",
              },
            }}
          >
            {user.firstName + " " + user.middleName + " " + user.lastName}
          </Typography>
          <Avatar alt={user.lastName}>
            <Image src={user.avatar} alt="avatar" width={60} height={60} />
          </Avatar>
        </Stack>
      </Stack>
    </Stack>
  );
}
