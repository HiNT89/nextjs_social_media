import { Box, Stack, Link, Button } from "@mui/material";
import React from "react";
import { ROUTE_LIST } from "@/components/layout/routes";
import clsx from "clsx";
import { checkPathname } from "@/utils";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
export function Footer() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <Box
      component="footer"
      bgcolor={"primary.dark"}
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "58px",
      }}
    >
      <Stack
        component="nav"
        direction={"row"}
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          textTransform: "captialize",
          display: { xs: "flex", md: "none" },
        }}
      >
        {ROUTE_LIST.map((route) => {
          return (
            <Box
              component={"div"}
              sx={{ width: "100%", p: "12px", borderRadius: "8px" }}
              key={route.path}
              className={clsx({
                activeLink: checkPathname(router.pathname, route.path),
              })}
            >
              {route.label === "logout" ? (
                <Button onClick={handleLogout}>
                  <Stack direction="row" alignItems="center" gap={2}>
                    {route.icon}
                  </Stack>
                </Button>
              ) : (
                <Link
                  href={
                    route.label === "profile"
                      ? `${route.path}/${user?._id}`
                      : route.path
                  }
                >
                  <Stack direction="row" alignItems="center" gap={2}>
                    {route.icon}
                  </Stack>
                </Link>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
