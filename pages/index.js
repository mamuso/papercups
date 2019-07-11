import React from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";
import styled from "styled-components";

import Cup from "../components/Cup";

const IndexPage = () => (
  <Layout context="home">
    {data.map(p => (
      <Cup key={p.slug} cup={p} />
    ))}
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
