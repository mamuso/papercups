import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { transparentize } from "polished";
import {
  headerFont,
  monospace,
  fontS,
  fontXXXL,
  fontXXXXL
} from "../utils/fonts";
import { textColor } from "../utils/colors";

export const Card = styled.section`
  grid-area: card;
  align-self: end;
  margin-bottom: 5.4rem;
  &.bigcup {
    margin-bottom: 3.2rem;
  }
`;

export const H2 = styled.h2`
  position: relative;
  z-index: 1;
  width: 46rem;
  margin: 0;
  font-family: ${headerFont};
  font-size: ${fontXXXL};
  line-height: 1;
  &.bigcup {
    font-size: ${fontXXXXL};
  }
`;

export const Address = styled.address`
  position: relative;
  left: -1.6rem;
  top: -1.2rem;
  width: 29rem;
  padding: 1.8rem 1.6rem;
  border-radius: 0.4rem;
  background: white;
  font-family: ${monospace};
  font-size: ${fontS};
  font-style: normal;
  color: ${transparentize(0.3, textColor)};
`;

const CupdetailsItem = ({ cup, classname }) => (
  <Card className={classname}>
    <Link route="cup" params={{ slug: cup.slug }}>
      <a>
        <H2 className={classname}>{cup.name}</H2>
        <Address className={classname}>{cup.address}</Address>
      </a>
    </Link>
  </Card>
);

export default CupdetailsItem;
