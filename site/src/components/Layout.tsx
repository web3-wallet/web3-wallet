import type { BoxProps } from '@chakra-ui/react';
import { Box, Spacer } from '@chakra-ui/react';

import { Footer } from './Footer';
import { SiteMenu } from './SiteMenu';

export const Layout = ({ children, ...rest }: BoxProps) => (
  <Box minH="100vh" {...rest}>
    <SiteMenu />
    <Box margin="0 auto" maxW="1180px" px={{ base: 6, xl: 0 }}>
      {children}
    </Box>
    <Spacer my={10} />
    <Footer />
  </Box>
);
