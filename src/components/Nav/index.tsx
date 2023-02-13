import { Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';

const Nav: FC = () => {
  return (
    <Flex
      align="center"
      color="white"
      justify="space-between"
      position="fixed"
      px={6}
      py={4}
      top={0}
      w="100%"
    >
      <Text>RayAuth</Text>
    </Flex>
  );
};

export default Nav;
