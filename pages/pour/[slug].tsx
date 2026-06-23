import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import data from "../../data/data.json";
import Layout from "../../layouts/Layout";
import Cup from "../../components/Cup";
import type { CupData } from "../../types/cup";

type CupPageProps = {
  cup: CupData;
};

const cups = data as CupData[];

const CupPage: NextPage<CupPageProps> = ({ cup }) => {
  return (
  <Layout
    title={`Sipped some coffee at ${cup.name}, ${cup.city} ${cup.country}`}
    context="cup"
  >
    <section>
        <Cup cup={cup} size="large" />  
    </section>
  </Layout>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const paths = cups.map((cup) => ({
    params: { slug: cup.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<CupPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const cup = cups.find((coffee) => coffee.slug === slug);

  if (!cup) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cup,
    }
  };
}

export default CupPage
