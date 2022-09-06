import { type BoxProps, Box } from './Box';

export type TagProps = {
  isConnected: boolean;
} & BoxProps;

export const Tag = ({ isConnected, style, ...rest }: TagProps) => {
  return (
    <Box
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        padding: '2px 8px',
        borderRadius: '4px',
        textAlign: 'center',
        ...(isConnected
          ? {
              border: '1px solid blue',
              color: 'blue',
            }
          : {
              border: '1px solid',
            }),
        ...style,
      }}
      {...rest}
    />
  );
};
