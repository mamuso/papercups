import React, { useEffect } from 'react';
import Router from 'next/router';
import { AppProps } from "next/app";
import theme from "../components/theme";
import { ThemeProvider } from "styled-components";
import * as Fathom from 'fathom-client';

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
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
