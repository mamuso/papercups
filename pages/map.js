import React, { Component } from "react";
import Layout from "../layouts/Layout";
import { Link } from "../routes";
import styled from "styled-components";
import data from "../data/data.json";

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
  height: 40rem;
  overflow: hidden;
  mix-blend-mode: luminosity;
  opacity: 0.55;
`;

export const H2 = styled.h2`
  position: relative;
  z-index: 2;
  width: 80%;
  max-width: 60rem;
  margin: -7.2rem 3.2rem 1rem;
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.bodytext};
`;

export const Maplist = styled.div`
  display: grid;
  margin: 0 3.2rem 3.2rem;
`;

// Unique cities
const lookup = {};
var uniqueCities = [];

for (var item, i = 0; (item = data[i++]); ) {
  var city = item.city;
  if (!(city in lookup)) {
    lookup[city] = 1;
    uniqueCities.push(city);
  }
}

const CupPage = ({ cup }) => (
  <Layout title={`Sipped some coffe all over the world`}>
    <Wrapper>
      <Map>
        <DynamicComponentWithNoSSR />
      </Map>
    </Wrapper>
    <H2>The cups:</H2>
    <Maplist>
      {uniqueCities.map(city => (
        <div>
          {city}
          <ul>
            {data
              .filter(x => x.city === city)
              .map(cup => (
                <li>
                  <Link route="cup" params={{ slug: cup.slug }}>
                    <a>{cup.name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </Maplist>
  </Layout>
);

CupPage.getInitialProps = async ({ query }) => {
  return {};
};

export default CupPage;
