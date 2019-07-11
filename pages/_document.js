import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Meta from "../components/Meta";
import CSS from "../components/CSS";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage(Component => props =>
      sheet.collectStyles(<Component {...props} />)
    );

    const styleElements = sheet.getStyleElement();
    return { ...page, styleElements };
  }

  render() {
    const { styleElements } = this.props;

    return (
      <html lang="en">
        <Head>
          <Meta />
          <CSS />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Playfair+Display:700&display=swap"
          />
          {styleElements}
        </Head>
        <body>
          <div className="root">
            <Main />
            <NextScript />
          </div>
        </body>
      </html>
    );
  }
}
