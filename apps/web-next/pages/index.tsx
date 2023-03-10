import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Heading } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Heading>Make your dApp&apos;s UX smooth as butter 🧈</Heading>
    </>
  );
}
