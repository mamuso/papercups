import Head from "next/head";
import Nav from "../components/Nav";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Content = styled.div`
  padding: 6rem 8rem 4rem;
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
