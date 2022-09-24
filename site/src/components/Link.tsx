import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

export type LinkProps = NextLinkProps & {
  children: ReactNode;
  chakraLinkProps?: ChakraLinkProps;
};

export const Link = ({
  href,
  children,
  chakraLinkProps,
  ...rest
}: LinkProps) => {
  return (
    <NextLink href={href} {...rest} passHref>
      <ChakraLink
        _hover={{
          textDecoration: 'none',
          color: 'red.500',
        }}
        display="flex"
        {...chakraLinkProps}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
