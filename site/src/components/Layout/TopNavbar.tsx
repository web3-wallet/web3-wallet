import { CloseIcon } from '@chakra-ui/icons';
import type { FlexProps, IconProps } from '@chakra-ui/react';
import {
  Box,
  chakra,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { RiMenu3Line } from 'react-icons/ri';

import { ColorMode } from '../ColorMode';
import { Link } from '../Link';
import { Logo } from '../Logo';
import { MAX_CONTENT_WIDTH, TOP_NAVBAR_HEIGHT } from './constants';

const RiMenu3Line_ = chakra(RiMenu3Line);

const MenuLineIcon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  props,
  ref,
) {
  return (
    <Box display="inline" ref={ref}>
      <RiMenu3Line_ {...props} />
    </Box>
  );
});

const links = [
  { href: '/docs/getting-started', label: 'Docs' },
  { href: '/wallets/metamask', label: 'Wallets' },
  { href: '/plugins/balance', label: 'Plugins' },
];

export const TopNavbar = ({ ...props }: FlexProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const router = useRouter();
  const asPath = router.asPath;

  return (
    <Flex
      fontWeight="medium"
      borderBottomWidth="1px"
      justifyContent="center"
      position={{ base: 'static', lg: 'fixed' }}
      top={0}
      left={0}
      right={0}
      zIndex="docked"
      background={bg}
      {...props}
    >
      <Flex
        maxW={MAX_CONTENT_WIDTH}
        height={`${TOP_NAVBAR_HEIGHT}px`}
        width="100%"
        alignItems="center"
        px={6}
        gap={{ base: 6, md: 8, lg: 10 }}
      >
        <Logo />

        <Flex
          display={{ base: 'none', md: 'flex' }}
          gap={{ base: 6, md: 8, lg: 10 }}
        >
          {links.map(({ label, href }) => {
            const isActive = asPath.startsWith(href);
            return (
              <Link
                chakraLinkProps={{
                  fontWeight: isActive ? 'semibold' : 'medium',
                  color: isActive ? 'red.500' : undefined,
                }}
                key={label}
                href={href}
              >
                {label}
              </Link>
            );
          })}
        </Flex>

        {/** Github */}
        <Flex
          flexGrow="1"
          justifyContent="flex-end"
          alignItems="center"
          gap={4}
        >
          <Link
            href="https://github.com/web3-wallet/web3-wallet"
            chakraLinkProps={{
              display: 'flex',
              justifySelf: 'end',
              target: '_blank',
            }}
          >
            <Icon lineHeight="2rem" fontSize="1.5rem" as={AiOutlineGithub} />
          </Link>
          <ColorMode />
        </Flex>

        {/** site mobile menu */}
        <Box zIndex="dropdown" display={{ base: 'block', md: 'none' }}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  aria-label="site menu"
                  cursor="pointer"
                  transform={`scale(${isOpen ? 1.0 : 1.6})`}
                  _hover={{
                    color: 'red.500',
                  }}
                  as={isOpen ? CloseIcon : MenuLineIcon}
                />
                <MenuList>
                  {links.map(({ label, href }, idx) => {
                    const isActive = asPath.startsWith(href);
                    return (
                      <React.Fragment key={label}>
                        {idx !== 0 && <Divider />}
                        <MenuItem>
                          <Link
                            chakraLinkProps={{
                              width: '100%',
                              py: 1,
                              fontWeight: isActive ? 'semibold' : undefined,
                              color: isActive ? 'red.500' : undefined,
                            }}
                            href={href}
                          >
                            {label}
                          </Link>
                        </MenuItem>
                      </React.Fragment>
                    );
                  })}
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
};
