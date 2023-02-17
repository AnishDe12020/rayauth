import {
  Button,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Logo from './Logo';

const Nav: FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolled, setIsScrolled] = useState(false);

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < -5) {
        setIsScrolled(true);
      } else if (currPos.y >= -5) {
        setIsScrolled(false);
      }
    },
    [isMobile],
    undefined,
    false,
    16,
  );

  return (
    <Flex
      align="center"
      color="white"
      justify="space-between"
      position="sticky"
      px={14}
      py={6}
      top={0}
      w="100%"
      backdropBlur="xl"
      as="header"
      backdropFilter={
        isScrolled ? 'saturate(220%) blur(40px)' : 'saturate(100%) blur(0px)'
      }
      willChange="backdrop-filter background-color"
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

      <Flex align="center" gap={4} ml={4} as="nav">
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
