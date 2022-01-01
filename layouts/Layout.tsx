import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default ({ children, title = "Paper Cups", context }: any) => {
  return (
    <div>
      <Head>
        <title>️☕️ {title}</title>
      </Head>
      <header />
      <main>
        <Nav context={context} />
        {children}
        <Footer />
      </main>
    </div>
  );
};
