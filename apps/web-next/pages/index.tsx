import Head from "next/head";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { MainLayout } from "@/components/layouts/MainLayout";
import Hero from "@/components/Hero";

const inter = Inter({ subsets: ["latin"] });

const Landing = () => {
  return (
    <Box mt="20" className={inter.className}>
      <Hero />
    </Box>
  );
};

Landing.PageLayout = MainLayout;

export default Landing;
