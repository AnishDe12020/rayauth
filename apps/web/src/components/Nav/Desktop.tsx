import { Button, HStack, Link, Text } from '@chakra-ui/react';

const DesktopNav = () => (
  <HStack display={['none', 'none', 'flex']} fontWeight="bold" spacing={8}>
    <HStack>
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
    </HStack>

    <HStack>
      <Link href="/login">
        <Button
          _hover={{
            bgGradient: 'linear(to-r, blue.300, blue.500)',
          }}
          bgGradient="linear(to-r, blue.500, blue.300)"
          colorScheme="blue"
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
    </HStack>
  </HStack>
);

export default DesktopNav;
