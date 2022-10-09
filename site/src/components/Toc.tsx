import type { FlexProps } from '@chakra-ui/react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useScrollSpy } from '@site/hooks/useScrollSpy';
import type { TOC } from '@site/types/Docs';

import { Link } from './Link';

type TocProps = {
  toc: TOC;
} & FlexProps;

export const Toc = ({ toc, ...props }: TocProps) => {
  const activeId = useScrollSpy(
    toc.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: '0% 0% -50% 0%',
    },
  );

  const inActiveBorderColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Flex flexDirection="column" fontSize="13px" top={0} {...props}>
      {toc.map(({ id, content, indent }) => (
        <Link
          chakraLinkProps={{
            fontWeight: id === activeId ? 'bold' : 'medium',
            color: id === activeId ? 'red.500' : undefined,
            borderLeftWidth: '2px',
            borderColor: id === activeId ? 'red.500' : inActiveBorderColor,
            pl: indent * 3,
            py: 1,
          }}
          href={`#${id}`}
          key={id}
        >
          {content}
        </Link>
      ))}
    </Flex>
  );
};
