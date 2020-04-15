import React from "react";
import App, { Container } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../components/theme";
import Router from "next/router";
import withGA from "next-ga";
import "leaflet/dist/leaflet.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default withGA("UA-262914-15", Router)(MyApp);
