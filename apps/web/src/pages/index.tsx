import Nav from '@/components/Nav';
import {
  Badge,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Home = () => {
  return (
    <Flex
      bgColor="#020222"
      bgImage="url('/assets/bg.svg')"
      bgSize="cover"
      color="white"
      h="100vh"
      justify="space-between"
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
        mt={20}
        pl={14}
      >
        <Badge
          bg="rgba(255, 255, 255, 0.1)"
          border="1px solid rgba(255, 255, 255, 0.4)"
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
      <Image
        alt=""
        mr={40}
        objectFit="contain"
        src="/assets/home-illu.png"
        w="600px"
      />
    </Flex>
  );
};

export default Home;
