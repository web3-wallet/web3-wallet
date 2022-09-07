import { Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Logo = () => {
  return (
    <NextLink href="/" passHref>
      <Link display="flex">
        <Image width="32px" src="logos/logo.svg" alt="web3 wallet logo" />
      </Link>
    </NextLink>
  );
};
