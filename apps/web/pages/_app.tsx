import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

import { DefaultSeo } from "next-seo";
import NextNProgress from "nextjs-progressbar";

import SEO from "../seo.config";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
  };
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <div>
      <Script src="/secrets.js" />

      <QueryClientProvider client={queryClient}>
        <NextNProgress color="#6133C1" options={{ showSpinner: false }} />
        <DefaultSeo {...SEO} />

        <Toaster richColors theme="dark" position="bottom-right" />
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </div>
  );
}
