import { type BoxProps, Box } from './Box';

export const Card = ({ style, ...rest }: BoxProps) => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        padding: '1.2rem',
        overflow: 'auto',
        border: '1px solid #999',
        borderRadius: '0.5rem',
        ...style,
      }}
      {...rest}
    />
  );
};
