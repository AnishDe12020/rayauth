import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Kumbh Sans', sans-serif`,
    body: `'Kumbh Sans', sans-serif`,
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
