import React, { Component } from "react";
import Layout from "../layouts/Layout";
import styled from "styled-components";
import data from "../data/data.json";
import Cup from "../components/Cup";

import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/Worldmap"),
  {
    ssr: false
  }
);

export const Wrapper = styled.section`
  position: relative;
  margin: 1.6rem;
  background: ${props => props.theme.colors.gray[1]};
  border-radius: 0.4rem;
  overflow: hidden;
`;

export const Map = styled.div`
  position: relative;
  height: 60rem;
  overflow: hidden;
  mix-blend-mode: luminosity;
  opacity: 0.55;
`;

const CupPage = ({ cup }) => (
  <Layout title={`Sipped some coffe all over the world`}>
    <Wrapper>
      <Map>
        <DynamicComponentWithNoSSR />
      </Map>
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
