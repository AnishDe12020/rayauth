import {
  Flex,
  FlexProps,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Logo from './Logo';
import DesktopNav from './Desktop';
import Mobile from './Mobile';

const Nav: FC<FlexProps> = props => {
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
      py={6}
      top={0}
      mx={{ base: 8, md: 12, lg: 24 }}
      transition="all 50ms"
      zIndex="overlay"
      backdropBlur="xl"
      as="header"
      backdropFilter={
        isScrolled ? 'saturate(220%) blur(40px)' : 'saturate(100%) blur(0px)'
      }
      willChange="backdrop-filter background-color"
      {...props}
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

      <DesktopNav />
      <Mobile aria-label="Menu" />
    </Flex>
  );
};

export default Nav;
