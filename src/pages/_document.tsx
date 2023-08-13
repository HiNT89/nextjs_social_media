import * as React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { AppType } from "next/app";
import { createEmotionCache, roboto, theme } from "utils/index";
import { AppPropsWithLayout } from "@/models";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/social-media-7cc3d.appspot.com/o/admin%2Fhint.jpg?alt=media&token=06c5b413-ace1-4819-a4f4-967b84a3dc62"
        />
        <meta name="emotion-insertion-point" content="" />
        {/* <!-- Primary Meta Tags --> */}
        <title>Social Media - HiNT</title>
        <meta name="title" content="Social Media - HiNT" />
        <meta
          name="description"
          content="Website Social Media By HiNT Developer"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/social-media-7cc3d.appspot.com/o/admin%2Fhint.jpg?alt=media&token=06c5b413-ace1-4819-a4f4-967b84a3dc62"
        ></meta>

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Social Media - HiNT" />
        <meta
          property="og:description"
          content="Website Social Media By HiNT Developer"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/social-media-7cc3d.appspot.com/o/admin%2Fhint.jpg?alt=media&token=06c5b413-ace1-4819-a4f4-967b84a3dc62"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Social Media - HiNT" />
        <meta
          property="twitter:description"
          content="Website Social Media By HiNT Developer"
        />
        <meta
          property="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/social-media-7cc3d.appspot.com/o/admin%2Fhint.jpg?alt=media&token=06c5b413-ace1-4819-a4f4-967b84a3dc62"
        />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<
          React.ComponentProps<AppType> & AppPropsWithLayout
        >,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};