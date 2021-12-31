import type { NextPage } from 'next'
import data from "../data/data.json";

import Layout from "../layouts/Layout";
import Gridhome from "../components/Gridhome";
import SmallCup from "../components/Smallcup";

const Home: NextPage = () => {
  return (
    <Layout>
      <Gridhome>
        {data.map(p => (
          <SmallCup key={p.slug} cup={p} />
        ))}
      </Gridhome>
    </Layout>

  )
}

export default Home
