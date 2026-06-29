import type { GetStaticProps, NextPage } from 'next';

import Cup from '../components/Cup';
import Layout from '../layouts/Layout';
import { getAllCups } from '../lib/cups';
import type { CupData } from '../types/cup';

interface HomeProps {
  cups: CupData[];
}

const Home: NextPage<HomeProps> = ({ cups }) => {
  return (
    <Layout>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cups.map((cup) => (
          <Cup key={cup.slug} cup={cup} size="small" />
        ))}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { cups: getAllCups() },
});

export default Home;
