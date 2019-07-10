import Head from "next/head";
import Nav from "../components/Nav";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Content = styled.section``;

export default ({ children, title = "Paper Cups" }) => (
  <Wrapper>
    <Head>
      <title>️☕️ {title}</title>
    </Head>
    <header />
    <main>
      <Nav />
      <Content>{children}</Content>
    </main>
  </Wrapper>
);
