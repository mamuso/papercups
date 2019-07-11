import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { darken, desaturate, transparentize } from "polished";
import { paleGrey } from "../utils/colors";

import Cupdetails from "./Cupdetails";

export const Bar = styled.div`
  position: relative;
  padding: 4.2rem 3.2rem 3.2rem 3.2rem;
  transition: background 0.24s;
  background-position: center center;
  background-size: cover;
  border-radius: 0.4rem;
  overflow: hidden;
  &:hover {
    background-image: linear-gradient(${transparentize(
      0.25,
      desaturate(0.04, darken(0.04, paleGrey))
    )}, ${desaturate(
  0.04,
  darken(0.04, paleGrey)
)}), url("/static/maps/${props => props.slug}.png");
    background-color: ${desaturate(0.04, darken(0.04, paleGrey))};
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 22rem auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "cup card";
  max-width: 64rem;
  margin: 0 auto;
`;

export const Cup = styled.section`
  grid-area: cup;
`;

export const Img = styled.img`
  width: 30rem;
  margin-left: -4rem;
`;

const CupItem = ({ cup }) => (
  <Link route="cup" params={{ slug: cup.slug }}>
    <a>
      <Bar slug={cup.slug}>
        <Wrapper>
          <Cupdetails cup={cup} />
          <Cup>
            <Img
              src={`/static/cups/${cup.slug}@S.png`}
              alt={`${cup.name} coffee cup`}
            />
          </Cup>
        </Wrapper>
      </Bar>
    </a>
  </Link>
);

export default CupItem;
