import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

import { RIGHT_SIDEBAR_WIDTH } from './constants';

export const RightSidebar = (props: BoxProps) => {
  return (
    <Box
      pt={16}
      width={RIGHT_SIDEBAR_WIDTH}
      display={{ base: 'none', xl: 'block' }}
      height="100%"
      {...props}
    />
  );
};
