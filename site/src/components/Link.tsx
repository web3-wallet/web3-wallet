import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

export const Link = ({
  href,
  children,
  linkProps,
  ...rest
}: LinkProps & {
  children: ReactNode;
  linkProps?: ChakraLinkProps;
}) => {
  return (
    <NextLink href={href} {...rest} passHref>
      <ChakraLink
        _hover={{
          textDecoration: 'none',
          color: 'red.500',
        }}
        display="flex"
        textShadow="1px 1px 2px #fff"
        {...linkProps}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
