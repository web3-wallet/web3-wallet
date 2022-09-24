import { chakra, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { RiMenu2Fill } from 'react-icons/ri';

import { LOCAL_NAVBAR_HEIGHT } from './constants';

const MenuFill = chakra(RiMenu2Fill);

export type LocalNavbarProps = {
  onMenuClick: () => void;
};
export const LocalNavbar = ({ onMenuClick }: LocalNavbarProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <Flex
      position="sticky"
      top="0px"
      bg={bg}
      height={`${LOCAL_NAVBAR_HEIGHT}px`}
      display={{ base: 'flex', lg: 'none' }}
      borderBottomWidth="1px"
      justifyContent="space-between"
      alignItems="center"
      color={useColorModeValue('gray.500', 'gray.300')}
      zIndex="docked"
      px={6}
    >
      <MenuFill
        onClick={onMenuClick}
        _hover={{
          color: 'red.500',
          cursor: 'pointer',
        }}
      />
      <Text
        _hover={{
          color: 'red.500',
          cursor: 'pointer',
        }}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
        fontSize="0.8em"
      >
        Back to top
      </Text>
    </Flex>
  );
};
