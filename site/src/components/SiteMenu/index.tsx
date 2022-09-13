import { Flex, Icon } from '@chakra-ui/react';
import { AiOutlineGithub } from 'react-icons/ai';

import { Link } from '../Link';
import { Logo } from './Logo';

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
        <Link href="/showcase">Showcase</Link>
        <Link href="/wallets">Wallets</Link>
        <Link href="/plugins">Plugins</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/docs-api">API</Link>
      </Flex>

      <Flex flexGrow="1" justifyContent="flex-end">
        <Link
          href="https://github.com/web3-wallet/web3-wallet"
          chakraLinkProps={{
            display: 'flex',
            justifySelf: 'end',
            target: '_blank',
          }}
        >
          <Icon lineHeight="2rem" fontSize="1.4rem" as={AiOutlineGithub} />
        </Link>
      </Flex>
    </Flex>
  );
};
