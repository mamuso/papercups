import React from "react";
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
    align-self: center;
    margin-top: 13.2rem;
    margin-bottom: 2.4rem;
  }
`;

export const H2 = styled.h2`
  position: relative;
  z-index: 1;
  width: 40rem;
  margin: 0;
  font-family: ${headerFont};
  font-size: ${fontXXXL};
  line-height: 1;
  &.bigcup {
    font-size: ${fontXXXXL};
    width: 80%;
    max-width: 60rem;
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
    <H2 className={classname}>{cup.name}</H2>
    <Address className={classname}>{cup.address}</Address>
  </Card>
);

export default CupdetailsItem;
