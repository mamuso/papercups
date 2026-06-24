import Head from "next/head";
import type { ReactNode } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  context?: string;
};

export default function Layout({ children, title = "Paper Cups", context }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{`☕️ ${title}`}</title>
      </Head>
        <Nav context={context} />
        <main>
          {children}
        </main>
        <Footer />
    </div>
  );
}
