import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Cup from '../../components/Cup';
import Layout from '../../layouts/Layout';
import { getAllCups, getCupBySlug } from '../../lib/cups';
import type { CupData } from '../../types/cup';

interface CupPageProps {
  cup: CupData;
}

const CupPage: NextPage<CupPageProps> = ({ cup }) => {
  return (
    <Layout title={`Sipped some coffee at ${cup.name}, ${cup.city} ${cup.country}`}>
      <section>
        <Cup cup={cup} size="large" />
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
