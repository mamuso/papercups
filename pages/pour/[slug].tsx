import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Layout from "../../layouts/Layout";
import { CupDetail } from "../../components/Cup";
import { getAllCups, getCupBySlug } from '../../lib/cups';
import type { Cup } from '../../types/cup';

interface CupPageProps {
  cup: Cup;
}

const CupPage: NextPage<CupPageProps> = ({ cup }) => {
  return (
    <Layout
      title={`Sipped some coffe at ${cup.name}, ${cup.city} ${cup.country}`}
      context="cup"
    >
      <section>
        <CupDetail cup={cup} />
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllCups().map((cup) => ({ params: { slug: cup.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<CupPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const cup = getCupBySlug(slug);

  if (!cup) {
    return { notFound: true };
  }

  return { props: { cup } };
};

export default CupPage;
