import { Box, BoxProps } from './Box';
import { Menu } from './Menu';

export const Layout = ({ children, style, ...rest }: BoxProps) => (
  <Box
    style={{
      margin: '1em',
      ...style,
    }}
    {...rest}
  >
    <Menu />
    {children}
  </Box>
);
