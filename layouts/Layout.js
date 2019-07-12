import Head from "next/head";
import Nav from "../components/Nav";

export default ({ children, title = "Paper Cups" }) => (
  <div>
    <Head>
      <title>️☕️ {title}</title>
    </Head>
    <header />
    <main>
      <Nav />
      {children}
    </main>
  </div>
);
