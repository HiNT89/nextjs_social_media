import { LayoutProps } from "@/models/common";
import Link from "next/link";
import { Auth, Footer, Header } from "@/components/common";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ROUTE_LIST } from "./routes";
import clsx from "clsx";
import { useRouter } from "next/router";
import { checkPathname } from "@/utils";
import { useAuth } from "@/hooks";
export function MainLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  // console.log(user)
  return (
    <Auth>
      <Header />
      <Stack component="main" direction="row" px={{ xs: "0px", md: "20px" }}>
        <Stack
          component="nav"
          direction={"column"}
          width="20%"
          alignItems={"center"}
          textTransform={"capitalize"}
          pr={"12px"}
          sx={{
            display: { xs: "none", md: "flex" },
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
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          textTransform: "captialize",
                        }}
                      >
                        {route.label}
                      </Typography>
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
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          textTransform: "captialize",
                        }}
                      >
                        {route.label}
                      </Typography>
                    </Stack>
                  </Link>
                )}
              </Box>
            );
          })}
        </Stack>
        {children}
      </Stack>
      <Footer />
    </Auth>
  );
}
