import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';

import type { ShowcaseItem } from './showcaseList';

type ShowcaseCardProps = {
  showcaseItem: ShowcaseItem;
};

export const ShowcaseCard = ({ showcaseItem }: ShowcaseCardProps) => {
  const { description, image, name, url } = showcaseItem;
  return (
    <Link
      _hover={{
        textDecoration: 'none',
      }}
      display="block"
      target="_blank"
      alignSelf="stretch"
      href={url}
      maxWidth="400px"
      minWidth="300px"
      // horizontal centering
      margin="0 auto"
    >
      <Flex
        py={4}
        borderWidth="1px"
        height="100%"
        textAlign="center"
        flexDirection="column"
        boxShadow={useColorModeValue('2px 2px 4px #eee', '2px 2px 4px #111')}
        borderRadius="8px"
      >
        <Heading fontSize="24px" as="h3">
          {name}
        </Heading>
        <Box my={2}>
          <Image src={image} alt={name} />
        </Box>
        <Text>{description}</Text>
      </Flex>
    </Link>
  );
};
