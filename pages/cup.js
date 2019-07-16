import React, { Component } from "react";
import Layout from "../layouts/Layout";
import styled from "styled-components";
import data from "../data/data.json";
import Cup from "../components/Cup";

import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false
});

export const Wrapper = styled.section`
  position: relative;
  padding-bottom: 1.6rem;
  background: ${props => props.theme.colors.gray[1]};
  overflow: hidden;
`;

export const Map = styled.div`
  position: relative;
  margin: 1.6rem 1.6rem 0 56rem;
  height: 86vh;
  overflow: hidden;
  border-radius: 0.4rem;
  mix-blend-mode: luminosity;
  opacity: 0.55;
`;

const CupPage = ({ cup }) => (
  <Layout
    title={`Sipped some coffe at ${cup.name}, ${cup.city} ${cup.country}`}
    context="cup"
  >
    <Wrapper>
      <Map>
        <DynamicComponentWithNoSSR cup={cup} />
      </Map>
      <Cup cup={cup} size="large" />
    </Wrapper>
  </Layout>
);

CupPage.getInitialProps = async ({ query }) => {
  return {
    cup: data.filter(function(coffee) {
      return coffee.slug === query.slug;
    })[0]
  };
};

export default CupPage;
