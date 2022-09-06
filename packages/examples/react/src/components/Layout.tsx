import { type BoxProps, Box } from './Box';

export const Layout = ({ children, style, ...rest }: BoxProps) => (
  <Box
    style={{
      ...style,
    }}
    {...rest}
  >
    {children}
  </Box>
);
