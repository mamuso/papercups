import type { NextPage } from 'next'
import data from "../data/data.json";

import Layout from "../layouts/Layout";
import Cup from "../components/Cup";

const Home: NextPage = () => {
  return (
    <Layout>
        {data.map(p => (
          <Cup key={p.slug} cup={p} size='small' />
        ))}
    </Layout>

  )
}

export default Home
