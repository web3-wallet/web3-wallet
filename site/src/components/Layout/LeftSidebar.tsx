import type { FlexProps } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Link } from '../Link';
import { LEFT_SIDEBAR_WIDTH, TOP_NAVBAR_HEIGHT } from './constants';

export type NavItem = {
  url: string;
  indent: number;
  label: string;
};

export type LeftSidebarProps = {
  navItems: NavItem[];
  onNavItemClick?: (navItem: NavItem) => void;
} & FlexProps;

export const LeftSidebar = ({
  navItems,
  onNavItemClick,
  ...props
}: LeftSidebarProps) => {
  const router = useRouter();

  /**
   * extract the pure pathname with tailing `/` removed
   */
  const pathname = router.asPath.replace(/(\?|#).*$/, '').replace(/\/$/, '');

  const links = navItems.map((navItem) => {
    const { indent, label, url } = navItem;
    const isActive = pathname === url.replace(/\/$/, '');

    return (
      <Link
        chakraLinkProps={{
          onClick: () => onNavItemClick?.(navItem),
          fontWeight: isActive ? 'bold' : 'medium',
          color: isActive ? 'red.500' : undefined,
          pl: (indent - 1) * 3,
        }}
        href={url}
        key={url}
      >
        {label}
      </Link>
    );
  });

  return (
    <Flex
      position="fixed"
      width={LEFT_SIDEBAR_WIDTH}
      height={`calc(100vh - ${TOP_NAVBAR_HEIGHT}px)`}
      overflowY="scroll"
      borderRightWidth="1px"
      flexDirection="column"
      fontSize="14px"
      gap={2}
      {...props}
    >
      {links}
    </Flex>
  );
};
