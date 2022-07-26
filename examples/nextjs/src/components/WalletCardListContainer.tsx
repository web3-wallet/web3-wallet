import { Box, BoxProps } from './Box';

export const WalletCardListContainer = ({ style, ...rest }: BoxProps) => {
  return (
    <Box
      style={{
        display: 'grid',
        alignItems: 'start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '1rem',
        margin: '2rem 0',
        gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
        ...style,
      }}
      {...rest}
    />
  );
};
