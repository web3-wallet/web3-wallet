import type { LinkProps } from '@chakra-ui/react';
import { Flex, Icon, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { AiOutlineGithub } from 'react-icons/ai';

import { Logo } from './Logo';

const Link = (props: LinkProps) => (
  <ChakraLink
    _hover={{
      textDecoration: 'none',
      color: 'red.500',
    }}
    textShadow="2px 2px 4px #fff"
    {...props}
  />
);

export const SiteMenu = () => {
  return (
    <Flex
      px={6}
      py={3}
      gap={{ base: 6, md: 8, lg: 10 }}
      bg="green.300"
      alignItems="center"
      fontWeight="medium"
    >
      <Logo />

      <Flex gap={{ base: 6, md: 8, lg: 10 }}>
        <NextLink href="/wallets" passHref>
          <Link>Wallets</Link>
        </NextLink>
        <NextLink href="/examples" passHref>
          <Link>Examples</Link>
        </NextLink>
        <NextLink href="/docs" passHref>
          <Link>Docs</Link>
        </NextLink>
        <NextLink href="/docs-api" passHref>
          <Link>API</Link>
        </NextLink>
      </Flex>

      <Flex flexGrow="1" justifyContent="flex-end">
        <Link
          display="flex"
          justifySelf="end"
          href="https://github.com/web3-wallet/web3-wallet"
          target="_blank"
        >
          <Icon lineHeight="2rem" fontSize="1.4rem" as={AiOutlineGithub} />
        </Link>
      </Flex>
    </Flex>
  );
};
