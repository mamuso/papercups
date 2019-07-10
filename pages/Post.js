import React, { Component } from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";

import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false
});

const PostPage = ({ cup }) => (
  <Layout
    title={`Sipped some coffe at ${cup.name}, ${cup.city} ${cup.country}`}
  >
    <DynamicComponentWithNoSSR cup={cup} />
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
