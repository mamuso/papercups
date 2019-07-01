import React from "react";
import Link from "next/link";
import styled from "styled-components";
// import Layout from "layouts/Main";
// import { getPost } from "api/posts";

const PostPage = ({ post }) => (
  <Layout>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
  </Layout>
);

PostPage.getInitialProps = async ({ query }) => {
  const res = await getPost(query.slug);
  const json = await res.json();
  return { post: json[0] };
};

export default PostPage;
