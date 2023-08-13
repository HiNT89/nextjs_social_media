import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
export const theme = createTheme({
  palette: {
    text: {
      primary: "#4e5d78",
      secondary: "#9ba3b3",
    },
    primary: {
      main: "#377dff",
      dark: "#f9fafb",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: { fontSize: "1rem", color: "#000" },
      },
      variants: [
        {
          props: { variant: "text" },
          style: {
            textTransform: "capitalize",
            fontSize: "0.8rem",
            color: "#377dff",
            "&:hover": {
              backgroundColor: "#fff",
            },
            "> span": {
              display: "none",
            },
          },
        },
        {
          props: { variant: "text", color: "secondary" },
          style: {
            textTransform: "capitalize",
            color: "#9ba3b3",
            fontWeight: "normal",
            "&:hover": {
              backgroundColor: "#fff",
            },
            "> span": {
              display: "none",
            },
          },
        },
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#377dff !important",
            opacity: "0.9",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#377dff",
              opacity: "1",
            },
            "> span": {
              display: "none",
            },
          },
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
        color: "#000",
      },
      styleOverrides: {},
      variants: [],
    },
    MuiAvatarGroup: {
      defaultProps: {},
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
});
