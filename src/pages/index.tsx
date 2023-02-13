import MainLayout from '@/Layout/Main.layout';
import { Button, Heading, Text, Icon } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiGithub } from 'react-icons/fi';

const Home = () => {
  const { data: session } = useSession();

  return (
    <MainLayout>
      <Heading size="4xl">
        Create your Next Solana Project <br />
        in seconds.
      </Heading>
      <Text fontSize="lg" maxW="2xl" mt={4}>
        An opinionated Next.js template for building Solana applications pre
        configured with Chakra UI, Next.js, Solana wallet adapter, ESlint,
        Prettier, and more.
      </Text>

      <Button
        colorScheme="blue"
        mt={4}
        onClick={() => {
          session ? signOut() : signIn();
        }}
        rounded="full"
        shadow="lg"
        size="lg"
      >
        <Icon as={FiGithub} mr={2} />
        {session ? 'Sign out' : 'Sign In'}
      </Button>
    </MainLayout>
  );
};

export default Home;
