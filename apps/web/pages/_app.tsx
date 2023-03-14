import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Toaster } from "sonner";

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
