import React, { Component } from "react";
import Layout from "../layouts/Blog";
import data from "../data.json";
import Bigcup from "../components/Bigcup";
import styled from "styled-components";

import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false
});

export const Wrapper = styled.section`
  position: relative;
  padding-bottom: 1.6rem;
  overflow: hidden;
`;

export const Cup = styled.div``;

export const Map = styled.div`
  margin: 1.6rem 1.6rem 0;
  height: 36rem;
  overflow: hidden;
  border-radius: 0.4rem;
  mix-blend-mode: luminosity;
  opacity: 0.55;
`;

const PostPage = ({ cup }) => (
  <Layout
    title={`Sipped some coffe at ${cup.name}, ${cup.city} ${cup.country}`}
    context="cup"
  >
    <Wrapper>
      <Cup>
        <Bigcup cup={cup} />
      </Cup>
      <Map>
        <DynamicComponentWithNoSSR cup={cup} />
      </Map>
    </Wrapper>
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
