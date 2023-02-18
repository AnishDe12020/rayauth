import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Inter, sans-serif',
    primary: 'Satoshi, sans-serif',
  },
  colors: {
    black: '#010511',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export { theme };
