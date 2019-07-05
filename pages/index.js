import React from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";

import Cup from "../components/Cup";

const IndexPage = () => (
  <Layout>
    {data.map(p => (
      <Cup key={p.slug} post={p} />
    ))}
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
