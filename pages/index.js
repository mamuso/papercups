import React from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";

import Cuppa from "../components/Cuppa";

const IndexPage = () => (
  <Layout>
    <ul>
      {data.map(p => (
        <li>
          <Cuppa key={p.slug} post={p} />
        </li>
      ))}
    </ul>
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
