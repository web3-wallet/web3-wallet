import { Link } from '@chakra-ui/react';
import logo from '@public/logos/logo.svg';
import Image from 'next/image';
import NextLink from 'next/link';

export const Logo = () => {
  return (
    <NextLink href="/" passHref>
      <Link display="flex">
        <Image width="32px" height="32px" src={logo} alt="web3 wallet logo" />
      </Link>
    </NextLink>
  );
};
