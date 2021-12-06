import '../styles/globals.css';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <title>써니로그</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
