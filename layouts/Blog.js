import Head from "next/head";
import Nav from "../components/Nav";
import { desaturate, darken } from "polished";
import { paleGrey } from "../utils/colors";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Content = styled.section`
  &.cup {
    background: ${desaturate(0.04, darken(0.04, paleGrey))};
  }
`;

export default ({ children, title = "Paper Cups", classname }) => (
  <Wrapper>
    <Head>
      <title>️☕️ {title}</title>
    </Head>
    <header />
    <main>
      <Nav />
      <Content className={classname}>{children}</Content>
    </main>
  </Wrapper>
);
