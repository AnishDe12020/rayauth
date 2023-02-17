import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { FC } from 'react';
import Logo from './Logo';

const Nav: FC = () => {
  return (
    <Flex
      align="center"
      color="white"
      justify="space-between"
      position="fixed"
      px={14}
      py={4}
      top={0}
      w="100%"
    >
      <Link href="/" role="group">
        <HStack gap={2}>
          <Logo h={6} _groupHover={{ opacity: 0.8 }} />

          <Text
            fontSize="xl"
            fontWeight="bold"
            _groupHover={{ color: 'gray.300' }}
          >
            RayAuth
          </Text>
        </HStack>
      </Link>

      <Flex align="center" gap={4} ml={4}>
        <Link href="/dashboard">
          <Text _hover={{ color: 'gray.300' }} cursor="pointer" mr={4}>
            Dashboard
          </Text>
        </Link>

        <Link href="">
          <Text _hover={{ color: 'gray.300' }} cursor="pointer" mr={4}>
            Docs
          </Text>
        </Link>
      </Flex>

      <Link href="/login">
        <Button
          _active={{ bg: 'rgba(255, 255, 255, 0.3)' }}
          _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
          bg="rgba(255, 255, 255, 0.1)"
          border="1px solid rgba(255, 255, 255, 0.4)"
          borderRadius="full"
          color="white"
          filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
          fontSize="sm"
          fontWeight="bold"
          px={10}
          py={4}
        >
          Login
        </Button>
      </Link>
    </Flex>
  );
};

export default Nav;
