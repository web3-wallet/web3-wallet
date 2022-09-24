import { SunIcon } from '@chakra-ui/icons';
import { chakra, IconButton, useColorMode } from '@chakra-ui/react';
import { BsFillMoonStarsFill } from 'react-icons/bs';

const MoonStarsFill = chakra(BsFillMoonStarsFill);

export const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="unstyle"
      fontSize="1.2em"
      _hover={{
        color: 'red.500',
      }}
      onClick={toggleColorMode}
      aria-label="color mode toggle button"
    >
      {colorMode === 'dark' ? <SunIcon /> : <MoonStarsFill />}
    </IconButton>
  );
};
