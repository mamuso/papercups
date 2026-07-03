import Head from 'next/head';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles/map.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
        <meta name="author" content="mamuso" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
