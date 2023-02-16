import Nav from '@/components/Nav';
import { Badge, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Home = () => {
  return (
    <Flex
      bgColor="#0D0A12"
      bgImage="url('/assets/login.svg')"
      bgSize="cover"
      color="white"
      flexDir="column"
      h="100vh"
      justify="center"
      overflow="hidden"
      w="100vw"
    >
      <Nav />
      <Flex
        align="flex-start"
        flexDir="column"
        gap={10}
        justify="flex-start"
        maxW="container.md"
        pl={14}
      >
        <Badge
          bg="rgba(255, 255, 255, 0.1)"
          border="1px solid white"
          borderRadius="full"
          color="white"
          filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
          fontSize="sm"
          fontWeight="bold"
          px={10}
          py={1}
        >
          Badge
        </Badge>

        <Heading size="4xl">Financial Banking Management Solutions</Heading>

        <Button
          _hover={{
            bgGradient: 'linear(to-r, blue.300, blue.500)',
          }}
          bgGradient="linear(to-r, blue.500, blue.300)"
          colorScheme="blue"
          fontSize="xl"
          px={12}
          py={8}
          rounded="full"
        >
          Get Started <Icon as={AiOutlineArrowRight} ml={2} />
        </Button>

        <Text mt={20}>
          A universal solution for financial customers and banks providing
          comprehensive banking services around the world.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
