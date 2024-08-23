import type { AppProps } from 'next/app';
import Head from 'next/head';

import icon from '../../public/favicon.ico';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='index, follow'></meta>
        <link rel='icon' href={icon.src} />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
