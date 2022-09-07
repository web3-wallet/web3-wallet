import type { FlexProps } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

export const WalletCard = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      flexDirection="column"
      gap={4}
      p={3}
      borderColor="gray.200"
      borderWidth="1px"
      borderRadius="8px"
      {...rest}
    />
  );
};
