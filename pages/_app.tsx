import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as Fathom from 'fathom-client';
import 'leaflet/dist/leaflet.css';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load('XRUGMNZE', {
      includedDomains: ['papercups.mamuso.net'],
    });

    const onRouteChangeComplete = () => {
      Fathom.trackPageview();
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
        <meta name="author" content="mamuso" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="/leaflet-fixes.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
