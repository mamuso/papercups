import React, { useEffect } from 'react';
import Router from 'next/router';
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
      <Component {...pageProps} />
  )
}

export default MyApp
