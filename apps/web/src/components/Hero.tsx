import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';
import type { FC } from 'react';

const Hero: FC = () => {
  return (
    <HStack
      justifyContent="space-between"
      color="white"
      h="100vh"
      mt={20}
      align="flex-start"
    >
      <Flex
        align={{ base: 'center', lg: 'flex-start' }}
        flexDir="column"
        justify="center"
        maxW="container.md"
        gap={6}
      >
        <Heading
          size={['2xl', '3xl', '4xl']}
          textAlign={{ base: 'center', lg: 'left' }}
          color="white"
        >
          Streamline user
          <br />
          <Text
            as="span"
            background="linear-gradient(90deg, #45A0F5 0%, #26E3C2 100%)"
            backgroundClip="text"
            textColor="transparent"
          >
            authorization
          </Text>
        </Heading>

        <Text color="#FFFFFFB2">
          Our sdks and infrastructure helps you to onboard new generation of
          users
        </Text>

        <Flex gap={4}>
          <Button fontSize="xl" rounded="full" color="black">
            Try for free
          </Button>
          <Button
            fontSize="xl"
            rounded="full"
            bg="transparent"
            color="white"
            border="1px solid white"
          >
            Documentation
          </Button>
        </Flex>
      </Flex>

      <Box
        display={['none', 'none', 'block']}
        background="linear-gradient(180deg, rgba(69, 160, 245, 0.5) 0%, rgba(38, 227, 194, 0.5) 100%)"
        filter="blur(100px)"
        position="absolute"
        right={40}
        top={40}
        zIndex={-1}
        width={80}
        height={80}
      />

      <Image
        alt=""
        mr={40}
        objectFit="contain"
        src="/assets/home-illu.svg"
        w={96}
        display={['none', 'none', 'block']}
      />
    </HStack>
  );
};
export default Hero;
