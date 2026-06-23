import type { NextPage } from 'next'
import data from "../data/data.json";

import Layout from "../layouts/Layout";
import Cup from "../components/Cup";
import type { CupData } from "../types/cup";

const cups = data as CupData[];

const Home: NextPage = () => {
  return (
    <Layout>
      <section className='homegrid'>
        {cups.map(p => (
          <Cup key={p.slug} cup={p} size='small' />
        ))}
      </section>
    </Layout>

  )
}

export default Home
