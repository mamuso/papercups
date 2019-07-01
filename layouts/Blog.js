import Head from "next/head";
import Wrapper from "./Wrapper";

export default ({ children, title = "This is the default title" }) => (
  <Wrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <header />

    <main>{children}</main>
  </Wrapper>
);
