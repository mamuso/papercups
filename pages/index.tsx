import type { GetStaticProps, NextPage } from 'next';

import { CupThumbnail } from '../components/Cup';
import { getThumbnailCups } from '../lib/cups';
import Layout from '../layouts/Layout';
import type { CupThumbnail as CupThumbnailType } from '../types/cup';

interface HomeProps {
  cups: CupThumbnailType[];
}

const Home: NextPage<HomeProps> = ({ cups }) => {
  return (
    <Layout>
      <section className='homegrid'>
        {cups.map((cup) => (
          <CupThumbnail key={cup.slug} cup={cup} />
        ))}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { cups: getThumbnailCups() },
});

export default Home;
