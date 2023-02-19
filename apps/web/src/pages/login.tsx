import Nav from '@/components/Nav';
import Logo from '@/components/Nav/Logo';
import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import useAuth from 'hooks/useAuth';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';

const login: FC = () => {
  const providers = [
    {
      label: 'Google',
      icon: FcGoogle,
      provider: 'google',
    },
    {
      label: 'Discord',
      icon: FaDiscord,
      color: '#636EF6',
      provider: 'discord',
    },
    {
      label: 'GitHub',
      icon: FiGithub,
      provider: 'github',
    },
  ];

  const { signIn } = useAuth();

  return (
    <Flex
      alignItems="center"
      bgColor="#0D0A12"
      bgImage="url('/assets/bg.svg')"
      bgSize="cover"
      color="white"
      display="flex"
      flexDir="column"
      h="100vh"
      overflow="hidden"
      textAlign="center"
      w="100vw"
    >
      <NextSeo title="Login" />

      <Nav w="80%" />

      <Flex align="center" justify="center" w="100vw" as="main">
        <VStack
          backdropFilter="blur(50px)"
          borderRight="1px solid whiteAlpha.200"
          gap={8}
          h="100vh"
          justify="center"
          p={8}
          shadow="lg"
          w="40vw"
        >
          <Logo h="100px" />

          <Heading fontSize="4xl">
            <Text as="span" color="whiteAlpha.900">
              Welcome to
            </Text>{' '}
            <Text as="span" color="white">
              RayAuth
            </Text>
          </Heading>

          <VStack gap={4}>
            {providers.map(({ label, icon, color, provider }) => (
              <Button
                _active={{ bg: 'whiteAlpha.400' }}
                _focus={{ boxShadow: 'none' }}
                _hover={{ bg: 'whiteAlpha.300' }}
                bg="whiteAlpha.200"
                color="white"
                key={label}
                mt={4}
                onClick={() => {
                  // window.location.replace(
                  //   `http://localhost:8080/auth/${provider}?callbackUrl=http://google.com&clientId=63ede626312c28bc4b903a9e`,
                  // );

                  signIn(
                    provider,
                    '63ede626312c28bc4b903a9e',
                    'http://google.com',
                  );
                }}
                rounded="lg"
                shadow="lg"
                size="lg"
                w={80}
              >
                <Icon as={icon} color={color} mr={4} />
                <Text>Sign in with {label}</Text>
              </Button>
            ))}
          </VStack>
        </VStack>
        <Flex
          align="center"
          justify="center"
          w="70vw"
          display={['none', 'none', 'block']}
        >
          <Image
            alt="Illustration"
            h="100vh"
            objectFit="cover"
            src="/assets/illustration.jpeg"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default login;
