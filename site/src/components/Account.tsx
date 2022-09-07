import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

type AccountProps = {
  account?: string;
  leadingChars?: number;
  tailingChars?: number;
} & TextProps;

export const Account = ({
  account: address,
  leadingChars = 4,
  tailingChars = 4,
  ...rest
}: AccountProps) => {
  if (!address) return null;

  return (
    <Text as="span" {...rest}>
      {address.slice(0, leadingChars)}...{address.slice(-tailingChars)}
    </Text>
  );
};
