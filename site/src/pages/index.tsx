import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Icon, Spacer, Text } from '@chakra-ui/react';
import { CurrentWalletCard } from '@site/components/CurrentWalletCard';
import { Layout } from '@site/components/Layout';
import { Link } from '@site/components/Link';
import Head from 'next/head';
import { AiOutlineGithub } from 'react-icons/ai';

function Page() {
  return (
    <Layout hideLeftSideBar>
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
          <CurrentWalletCard />
        </Flex>

        <Flex gap={{ base: 4, lg: 6 }} justifyContent="center">
          <Link href="/docs/getting-started">
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue">
              Get Started
            </Button>
          </Link>
          <Link
            href="https://github.com/web3-wallet/web3-wallet"
            chakraLinkProps={{
              display: 'flex',
              justifySelf: 'end',
              target: '_blank',
              _hover: {
                textDecoration: 'none',
              },
            }}
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

export default Page;
