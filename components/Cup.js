import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { darken, desaturate } from "polished";
import { paleGrey } from "../utils/colors";

import Cupdetails from "./Cupdetails";

export const Bar = styled.div`
  padding: 3.2rem;
  transition: background 0.24s;
  border-radius: 0.4rem;
  &:hover {
    background-color: ${desaturate(0.04, darken(0.04, paleGrey))};
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 22rem auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "cup card";
  max-width: 64rem;
  margin: 0 auto;
  transition: margin 0.24s;
  ${Bar}:hover & {
  }
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
      <Bar>
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
