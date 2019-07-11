import React from "react";
import styled from "styled-components";

import Cupdetails from "./Cupdetails";

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 52rem auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "cup card";
`;

export const Cup = styled.div`
  grid-area: cup;
  min-height: 46rem;
  & img {
    position: absolute;
    width: 64rem;
    margin-left: -6rem;
    bottom: -20rem;
  }
`;

const BigcupItem = ({ cup }) => (
  <Wrapper>
    <Cup>
      <img
        src={`/static/cups/${cup.slug}@L.png`}
        alt={`${cup.name} coffee cup`}
      />
    </Cup>
    <Cupdetails cup={cup} classname="bigcup" />
  </Wrapper>
);

export default BigcupItem;
