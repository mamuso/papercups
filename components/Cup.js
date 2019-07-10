import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { darken, desaturate } from "polished";
import { paleGrey } from "../utils/colors";

import Cupdetails from "./Cupdetails";

export const Bar = styled.div`
  padding: 4rem;
  transition: background 0.24s;
  &:hover {
    background: ${desaturate(0.04, darken(0.04, paleGrey))};
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 26rem auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "cup card";
  width: 72rem;
  margin: 0 auto;
  transition: margin 0.24s;
  ${Bar}:hover & {
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
  }
`;

export const Cup = styled.section`
  grid-area: cup;
`;

export const Img = styled.img`
  width: 30rem;
`;

const CupItem = ({ cup }) => (
  <Bar>
    <Wrapper>
      <Cupdetails cup={cup} />
      <Cup>
        <Link route="cup" params={{ slug: cup.slug }}>
          <a>
            <Img
              src={`/static/cups/${cup.slug}@S.png`}
              alt={`${cup.name} coffee cup`}
            />
          </a>
        </Link>
      </Cup>
    </Wrapper>
  </Bar>
);

export default CupItem;
