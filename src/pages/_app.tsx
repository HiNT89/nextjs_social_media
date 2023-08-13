import "../styles/globals.css";
import { SWRConfig } from "swr";
import axiosClient from "@/api/axios-client";
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "@/models";
import { createEmotionCache, theme } from "@/utils";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function App(props: AppPropsWithLayout) {
  const clientSideEmotionCache = createEmotionCache();
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const Layout = Component.layout ?? EmptyLayout;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SWRConfig
            value={{
              fetcher: (url) => axiosClient.get(url),
              shouldRetryOnError: false,
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
