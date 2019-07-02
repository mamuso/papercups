import React from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";
import Router from "next/router";
import { Link } from "../routes";

import Post from "../components/Post";

const IndexPage = () => (
  <Layout>
    <ul>
      {data.map(p => (
        <Post key={p.slug} post={p} />
      ))}
    </ul>
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default IndexPage;
