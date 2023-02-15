import Nav from '@/components/Nav';
import { Flex } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
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
      py="44"
      textAlign="center"
      w="100vw"
    >
      <Nav />
      {children}
    </Flex>
  );
};

export default MainLayout;
