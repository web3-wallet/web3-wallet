import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

export type LeftSidebarDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const LeftSidebarDrawer = ({
  isOpen,
  onClose,
  children,
}: LeftSidebarDrawerProps) => {
  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
