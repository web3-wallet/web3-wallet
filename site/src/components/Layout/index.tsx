import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import type { TOC } from '@site/types/Docs';
import type { ReactNode } from 'react';

import { Toc } from '../Toc';
import {
  LEFT_SIDEBAR_WIDTH,
  MAX_CONTENT_WIDTH,
  TOP_NAVBAR_HEIGHT,
} from './constants';
import { Footer } from './Footer';
import type { LeftSidebarProps } from './LeftSidebar';
import { LeftSidebar } from './LeftSidebar';
import { LeftSidebarDrawer } from './LeftSidebarDrawer';
import { LocalNavbar } from './LocalNavbar';
import { RightSidebar } from './RightSidebar';
import { TopNavbar } from './TopNavbar';

export type LayoutProps = {
  children: ReactNode;
  hideLeftSideBar?: boolean;
  leftSidebarProps?: Omit<LeftSidebarProps, 'onNavItemClick'>;
  toc?: TOC;
};

export const Layout = ({
  hideLeftSideBar,
  toc,
  children,
  leftSidebarProps,
}: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <TopNavbar />
      {!hideLeftSideBar && leftSidebarProps && (
        <LocalNavbar onMenuClick={onOpen} />
      )}
      <Flex
        mt={{
          base: 0,
          lg: `${TOP_NAVBAR_HEIGHT}px`,
        }}
        maxW={MAX_CONTENT_WIDTH}
        mx="auto"
        px={6}
      >
        {!hideLeftSideBar && leftSidebarProps && (
          <LeftSidebarDrawer isOpen={isOpen} onClose={onClose}>
            <LeftSidebar
              position="static"
              flex="0 0 auto"
              pt={10}
              width="100%"
              border="none"
              onNavItemClick={onClose}
              {...leftSidebarProps}
            />
          </LeftSidebarDrawer>
        )}
        {!hideLeftSideBar && !!leftSidebarProps && (
          <LeftSidebar
            display={{ base: 'none', lg: 'flex' }}
            flex="0 0 auto"
            pt={16}
            {...leftSidebarProps}
          />
        )}
        <Flex
          flex="1 1 auto"
          pl={{ base: 0, lg: hideLeftSideBar ? 0 : LEFT_SIDEBAR_WIDTH }}
        >
          <Box
            flex="1 1 auto"
            pl={{ base: 0, lg: hideLeftSideBar ? 0 : 12 }}
            pr={{ base: 0, xl: toc ? 12 : 0 }}
          >
            {children}
          </Box>
          {toc && (
            <RightSidebar flex="0 0 auto">
              <Toc position="sticky" top={`${TOP_NAVBAR_HEIGHT}px`} toc={toc} />
            </RightSidebar>
          )}
        </Flex>
      </Flex>
      <Spacer my={12} />
      <Footer />
    </>
  );
};
