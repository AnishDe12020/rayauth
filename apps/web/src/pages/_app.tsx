import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '@/styles/theme';
import { NextSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import '@fontsource/kumbh-sans/300.css';
import '@fontsource/kumbh-sans/400.css';
import '@fontsource/kumbh-sans/500.css';
import '@fontsource/kumbh-sans/600.css';
import '@fontsource/kumbh-sans/700.css';
import '@fontsource/kumbh-sans/800.css';
import '@fontsource/kumbh-sans/900.css';

const metadata = {
  title: 'RayAuth',
  description:
    'An opinionated Next.js template for building Solana applications pre configured with Chakra UI, Next.js, Solana wallet adapter, ESlint, Prettier, and more.',
  url: 'https://next-solana-starter.vercel.app/',
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        defaultTitle={metadata.title}
        description={metadata.description}
        openGraph={{
          title: metadata.title,
          description: metadata.description,
          url: metadata.url,
          type: 'website',
          siteName: metadata.title,
          images: [
            {
              url: '/assets/og.svg',
              width: 1200,
              height: 630,
              alt: metadata.title,
            },
          ],
        }}
        themeColor={theme.colors.black}
        title={metadata.title}
      />

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
