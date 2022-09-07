import type { ChakraTheme } from '@chakra-ui/react';
import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

const { colors } = chakraTheme;
const brand = {
  blue: '#2D80EE',
  red: '#E94637',
  green: '#30A24E',
  yellow: '#FBBD14',
};

const fontFamily = `"Space Mono", monospace, sans-serif`;

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        fontFamily,
      },
      'h1,h2,h3,h4,h5,h6': {
        fontFamily: `${fontFamily}!important`,
      },
    },
  },
  colors: {
    brand,
    red: {
      ...colors.red,
      500: brand.red,
    },
    green: {
      ...colors.green,
      500: brand.green,
    },
    yellow: {
      ...colors.yellow,
      500: brand.yellow,
    },
    blue: {
      ...colors.blue,
      500: brand.blue,
    },
  },
  components: {},
} as Partial<ChakraTheme>);
