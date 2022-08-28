import { Box, BoxProps } from './Box';

export const Layout = ({ children, style, ...rest }: BoxProps) => (
  <Box
    style={{
      margin: '1em',
      ...style,
    }}
    {...rest}
  >
    {children}
  </Box>
);
