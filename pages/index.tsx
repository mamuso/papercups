import type { NextPage } from 'next'
import data from "../data/data.json";

import Layout from "../layouts/Layout";
import { CupThumbnail } from "../components/Cup";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className='homegrid'>
        {data.map(p => (
          <CupThumbnail key={p.slug} cup={p} />
        ))}
      </section>
    </Layout>

  )
}

export default Home
