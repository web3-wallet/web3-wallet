import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Layout } from '@site/components/Layout';
import { WalletSelectCard } from '@site/components/WalletSelectCard';
import Head from 'next/head';
import { AiOutlineGithub } from 'react-icons/ai';

export function Page() {
  return (
    <Layout>
      <Head>
        <title>Home | Web3 Wallet </title>
      </Head>
      <Spacer my={12} />
      <Flex flexDirection="column" gap={12}>
        <Heading
          as="h1"
          textAlign="center"
          m="0 auto"
          width={{
            base: '100',
            lg: '80%',
          }}
        >
          A{' '}
          <Text as="span" color="yellow.500">
            Modular
          </Text>
          ,{' '}
          <Text as="span" color="green.500">
            Extensible
          </Text>{' '}
          and{' '}
          <Text as="span" color="red.500">
            Flexible
          </Text>{' '}
          web3 wallet framework for building dApps
        </Heading>

        <Flex justifyContent="center">
          <WalletSelectCard />
        </Flex>

        <Flex gap={{ base: 4, lg: 6 }} justifyContent="center">
          <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue">
            Get Started
          </Button>
          <Link
            display="flex"
            justifySelf="end"
            _hover={{
              textDecoration: 'none',
            }}
            href="https://github.com/web3-wallet/web3-wallet"
            target="_blank"
          >
            <Button leftIcon={<Icon as={AiOutlineGithub} />} variant="outline">
              Github
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Layout>
  );
}
