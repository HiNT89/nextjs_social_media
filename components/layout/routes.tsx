import {
  DynamicFeed,
  Message,
  AccountBox,
  Logout,
  NotificationsActive,
  Settings,
} from "@mui/icons-material";
export const ROUTE_LIST = [
  {
    label: "feed",
    path: "/",
    icon: <DynamicFeed />,
  },
  {
    label: "message",
    path: "/message",
    icon: <Message />,
  },

  // {
  //   label: "notification",
  //   path: "/notification",
  //   icon: <NotificationsActive />,
  // },

  {
    label: "profile",
    path: "/profile",
    icon: <AccountBox />,
  },
  {
    label: "information",
    path: "/setting",
    icon: <Settings />,
  },
  {
    label: "logout",
    path: "/logout",
    icon: <Logout />,
  },
];
