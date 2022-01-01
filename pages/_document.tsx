import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ReactElement } from 'react';
import { ServerStyleSheet } from "styled-components";

import Meta from "../components/Meta";
// import CSS from "../components/CSS";

class MyDocument extends Document {
  static async getInitialProps({renderPage}: DocumentContext) {
    const sheet = new ServerStyleSheet();

    const page = renderPage(Component => props =>
      sheet.collectStyles(<Component {...props} />)
    );

    const styleElements = sheet.getStyleElement();
    return { ...page, styleElements };
  }

  render() {
    const { styleElements }: any = this.props;

    return (
      <Html>
        <Head>
          <Meta />
          {/* <CSS /> */}
          {styleElements}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument