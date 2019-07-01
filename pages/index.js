import React from "react";
import Layout from "../layouts/Blog";
import { Link } from "../routes";

import Post from "../components/Post";

const IndexPage = ({ posts }) => (
  <Layout>
    <ul>
      {posts.map(p => (
        <Post key={p.title} post={p} />
      ))}
    </ul>
  </Layout>
);

IndexPage.getInitialProps = async ({ req }) => {
  // const res = await getPosts();
  // const json = await res.json();
  return {
    posts: [
      {
        title: "oh, of course",
        body: "sure"
      },
      {
        title: "uh",
        body: "absolutely"
      }
    ]
  };
};

export default IndexPage;
