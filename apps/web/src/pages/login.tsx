import Nav from '@/components/Nav';
import Logo from '@/components/Nav/Logo';
import { Button, Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';

const login: FC = () => {
  const providers = [
    {
      label: 'Google',
      icon: FcGoogle,
    },
    {
      label: 'Discord',
      icon: FaDiscord,
      color: '#636EF6',
    },
    {
      label: 'GitHub',
      icon: FiGithub,
    },
    {
      label: 'Twitter',
      icon: FaTwitter,
      color: '#1F9CEA',
    },
  ];

  return (
    <Flex
      alignItems="center"
      bgColor="#0D0A12"
      bgImage="url('/assets/login.svg')"
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
      <Nav />

      <Flex align="center" justify="center" w="100vw">
        <VStack
          backdropFilter="blur(100px)"
          bg="whiteAlpha.50"
          borderRight="1px solid whiteAlpha.200"
          gap={6}
          h="100vh"
          justify="center"
          p={8}
          w="40vw"
        >
          <Logo h="120px" />

          <Heading>
            <Text as="span" color="whiteAlpha.900">
              Welcome to
            </Text>{' '}
            <Text as="span" color="white">
              RayAuth
            </Text>
          </Heading>

          <VStack gap={2}>
            {providers.map(({ label, icon, color }) => (
              <Button
                _active={{ bg: 'whiteAlpha.400' }}
                _focus={{ boxShadow: 'none' }}
                _hover={{ bg: 'whiteAlpha.300' }}
                bg="whiteAlpha.200"
                color="white"
                key={label}
                mt={4}
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
        <Flex align="center" justify="center" w="70vw" />
      </Flex>
    </Flex>
  );
};
export default login;
