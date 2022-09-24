import type { ChakraTheme } from '@chakra-ui/react';
import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

import { styles } from './styles';

const { colors } = chakraTheme;

const brand = {
  blue: '#2D80EE',
  red: '#E94637',
  green: '#30A24E',
  yellow: '#FBBD14',
};

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
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
  styles,
  components: {},
} as Partial<ChakraTheme>);
