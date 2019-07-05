import React from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";
import styled from "styled-components";

const PostPage = ({ cup }) => (
  <Layout>
    <h1>{cup.name}</h1>
    <img src={`/static/cups/${cup.slug}@L.png`} />
  </Layout>
);

PostPage.getInitialProps = async ({ query }) => {
  return {
    cup: data.filter(function(coffee) {
      return coffee.slug === query.slug;
    })[0]
  };
};

export default PostPage;
