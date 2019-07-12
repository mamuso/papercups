import React from "react";
import data from "../data/data.json";

import Layout from "../layouts/Layout";
import Gridhome from "../components/Gridhome";
import Cupcontainer from "../components/Cupcontainer";

const IndexPage = () => (
  <Layout>
    <Gridhome>
      {data.map(p => (
        <Cupcontainer key={p.slug} cup={p} />
      ))}
    </Gridhome>
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
