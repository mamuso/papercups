import React from "react";
import Layout from "../layouts/Layout";
import data from "../data/data.json";

import Cup from "../components/Cup";

const IndexPage = () => (
  <Layout>
    {data.map(p => (
      <Cup key={p.slug} cup={p} />
    ))}
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
