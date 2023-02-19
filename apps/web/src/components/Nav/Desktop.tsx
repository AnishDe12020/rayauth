import { Button, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

const DesktopNav = () => (
  <HStack display={['none', 'none', 'flex']} fontWeight="bold" spacing={8}>
    <HStack>
      <Link href="/memo">
        <Text _hover={{ color: 'gray.300' }} cursor="pointer" mr={4}>
          Memo
        </Text>
      </Link>
      <Link href="">
        <Text _hover={{ color: 'gray.300' }} cursor="pointer" mr={4}>
          Docs
        </Text>
      </Link>
    </HStack>

    <HStack>
      <Link href="/login">
        <Button
          fontSize="md"
          rounded="full"
          background="white"
          color="black"
          fontWeight={900}
          textDecoration="none"
          _hover={{ bg: 'whiteAlpha.700' }}
        >
          Get Started
        </Button>
      </Link>
    </HStack>
  </HStack>
);

export default DesktopNav;
