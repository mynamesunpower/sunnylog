import '../styles/globals.css';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>어나더</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
