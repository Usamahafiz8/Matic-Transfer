import ConnectButton from '@/components/ConnectButton';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Web3 App</title>
        <meta name="description" content="A simple Web3 app with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to My Web3 App</h1>
        <ConnectButton />
      </main>
    </div>
  );
}
