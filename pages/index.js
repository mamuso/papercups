import React from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";
import styled from "styled-components";

import Cup from "../components/Cup";

export const Cups = styled.section`
  padding: 4rem 0 6rem;
`;

const IndexPage = () => (
  <Layout>
    <Cups>
      {data.map(p => (
        <Cup key={p.slug} post={p} />
      ))}
    </Cups>
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
