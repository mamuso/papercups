import React, { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { AppProps } from "next/app";
import * as Fathom from 'fathom-client';

import '../styles/global.scss';

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load('XRUGMNZE', {
      includedDomains: ['papercups.mamuso.net']
    });
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
        <meta name="author" content="mamuso" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
