import Head from "next/head";
import type { ReactNode } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function Layout({ children, title = "Paper Cups" }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{`☕️ ${title}`}</title>
      </Head>
      <Nav />
      <main className="flex-1 pl-16 py-10 pr-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
