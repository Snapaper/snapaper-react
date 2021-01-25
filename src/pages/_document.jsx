import Document, { Html, Head, Main, NextScript } from "next/document";

const APP_NAME = "Snapaper";
const APP_DESCRIPTION =
  "An Integrated Platform of Past-papers and More Study Resources";

export default class extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="viewport-fit=cover" />
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#f1f2f3" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/snapaper_logo_192.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/snapaper_logo.ico" />
          <link
            rel="preload"
            href="https://static.ouorz.com/snapaper@next.png"
            as="image"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
