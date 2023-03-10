import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, chakra, ChakraProvider, VStack } from "@chakra-ui/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  GlowWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";

import theme from "../theme";
import dynamic from "next/dynamic";

import "@solana/wallet-adapter-react-ui/styles.css";

import { clusterApiUrl } from "@solana/web3.js";

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new GlowWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <ChakraProvider theme={theme}>
        <WalletProvider wallets={wallets} autoConnect>
          <ReactUIWalletModalProviderDynamic>
            <Box
              bg="#f53598"
              filter="blur(200px)"
              h={{ base: "52", md: "72" }}
              position="absolute"
              rounded="full"
              w={{ base: "60", md: "96" }}
              left="16"
              top="96"
              opacity="0.3"
            />
            <Box
              bg="#484bfd"
              filter="blur(200px)"
              h={{ base: "52", md: "72" }}
              position="absolute"
              rounded="full"
              w={{ base: "60", md: "96" }}
              right="16"
              top="48"
              opacity="0.6"
            />

            <VStack h="100vh">
              <VStack as="main" zIndex="1" mt={32} px={4} maxW="4xl">
                <Component {...pageProps} />
              </VStack>
            </VStack>
          </ReactUIWalletModalProviderDynamic>
        </WalletProvider>
      </ChakraProvider>
    </ConnectionProvider>
  );
}
