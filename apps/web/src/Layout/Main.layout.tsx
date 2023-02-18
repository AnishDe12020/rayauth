import Nav from '@/components/Nav';
import { Box } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Box
        bgColor="#0D0A12"
        color="white"
        h="100vh"
        w="100vw"
        position="fixed"
        zIndex="-1"
        overflow="hidden"
      />
      <Nav />
      <Box as="main" mx={{ base: 8, md: 12, lg: 24 }} pb={16}>
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
