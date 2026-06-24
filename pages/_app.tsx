import React from 'react';
import Head from 'next/head';
import { AppProps } from "next/app";

import '../styles/global.scss';
import 'leaflet/dist/leaflet.css';
import '../styles/leaflet-fixes.scss';

function MyApp({ Component, pageProps }: AppProps) {
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
