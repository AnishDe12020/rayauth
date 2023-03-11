import { Box, Container, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { BsDiscord, BsTwitter } from "react-icons/bs";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container as="main" mt="20" maxW={"1200px"}>
        <Box w="full" mt="20">
          {children}
        </Box>
      </Container>
      <Box
        position={"fixed"}
        top="50%"
        left="0"
        bg="whiteAlpha.100"
        borderRadius={"md"}
      >
        <Flex flexDirection={"column"} p="3">
          <Box
            my="2"
            _hover={{
              cursor: "pointer",
              color: "blue.500",
            }}
            as="a"
            href="https://discord.gg/xyz"
            target={"_blank"}
          >
            <BsDiscord size="30" />
          </Box>
          <Box
            my="2"
            _hover={{
              cursor: "pointer",
              color: "blue.500",
            }}
            as="a"
            href="https://twitter.com/xyz"
            target={"_blank"}
          >
            <BsTwitter size="30" />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
