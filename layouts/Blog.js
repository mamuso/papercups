import Head from "next/head";
import Nav from "../components/Nav";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Content = styled.div`
  padding: 4rem 8rem 6rem;
`;

export default ({ children, title = "☕️ Paper Cups" }) => (
  <Wrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <header />
    <main>
      <Nav />
      <Content>{children}</Content>
    </main>
  </Wrapper>
);
