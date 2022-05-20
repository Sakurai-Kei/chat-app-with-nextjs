import "../styles/globals.css";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import { AppPropsWithLayout } from "../interfaces/Components";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return page;
    });
  return getLayout(
    <SWRConfig
      value={{
        fetcher: fetchJson,
        refreshInterval: 1000,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Head>
        <meta name="application-name" content={"SKCA PWA"} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={"SKCA PWA"} />
        <meta
          name="description"
          content={"Delivering the mobile experience to your desktop"}
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.svg"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
