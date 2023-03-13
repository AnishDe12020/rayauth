import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import { Toaster } from "sonner";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
  };
};

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <div>
      <Script src="/secrets.js" />

      <Toaster richColors theme="dark" position="bottom-right" />
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
