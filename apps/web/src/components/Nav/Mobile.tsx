import {
  Drawer,
  useDisclosure,
  VStack,
  Text,
  DrawerContent,
  Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Rotate } from 'hamburger-react';

const Mobile = () => {
  const disclosure = useDisclosure();

  return (
    <>
      <Box display={{ base: 'inline-flex', md: 'none' }}>
        <Rotate
          toggle={disclosure.onOpen}
          toggled={disclosure.isOpen}
          direction="right"
          label="Menu"
          size={24}
          rounded
        />
      </Box>

      <Drawer
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        placement="right"
        size="full"
      >
        <DrawerContent
          mt={28}
          bgColor="#0D0A12"
          bgImage="url('/assets/bg.svg')"
          bgSize="cover"
        >
          <VStack w="full" alignItems="start" px={8} gap={4}>
            <Link href="/dashboard">
              <Text
                _hover={{ color: 'gray.300' }}
                cursor="pointer"
                borderBottom="1px solid"
                borderBottomColor="brand.secondary"
                py={1}
                w="full"
              >
                Dashboard
              </Text>
            </Link>

            <Link href="/docs">
              <Text
                _hover={{ color: 'gray.300' }}
                cursor="pointer"
                borderBottom="1px solid"
                borderBottomColor="brand.secondary"
                py={1}
                w="full"
              >
                Docs
              </Text>
            </Link>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Mobile;
