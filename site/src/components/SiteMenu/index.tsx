import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineGithub } from 'react-icons/ai';

import { Link } from '../Link';
import { Logo } from './Logo';

const links = [
  { href: '/showcase', label: 'Showcase' },
  { href: '/wallets', label: 'Wallets' },
  { href: '/plugins', label: 'Plugins' },
  { href: '/docs', label: 'Docs' },
  { href: '/docs-api', label: 'API' },
];

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

      <Flex
        display={{ base: 'none', md: 'flex' }}
        gap={{ base: 6, md: 8, lg: 10 }}
      >
        {links.map(({ label, href }) => (
          <Link key={label} href={href}>
            {label}
          </Link>
        ))}
      </Flex>

      {/** Github */}
      <Flex flexGrow="1" justifyContent="flex-end">
        <Link
          href="https://github.com/web3-wallet/web3-wallet"
          chakraLinkProps={{
            display: 'flex',
            justifySelf: 'end',
            target: '_blank',
          }}
        >
          <Icon lineHeight="2rem" fontSize="1.8rem" as={AiOutlineGithub} />
        </Link>
      </Flex>

      {/** site mobile menu */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                aria-label="site menu"
                cursor="pointer"
                transform={`scale(${isOpen ? 1.2 : 1.8})`}
                _hover={{
                  color: 'red.500',
                }}
                as={isOpen ? CloseIcon : HamburgerIcon}
              />
              <MenuList>
                {links.map(({ label, href }, idx) => (
                  <React.Fragment key={label}>
                    {idx !== 0 && <Divider />}
                    <MenuItem>
                      <Link
                        chakraLinkProps={{
                          width: '100%',
                          py: 1,
                        }}
                        href={href}
                      >
                        {label}
                      </Link>
                    </MenuItem>
                  </React.Fragment>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </Box>
    </Flex>
  );
};
