import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { transparentize, darken, desaturate } from "polished";
import { headerFont, monospace, fontS, fontXXXL } from "../utils/fonts";
import { textColor, paleGrey } from "../utils/colors";

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
  grid-template-columns: 260px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "cup card";
  width: 720px;
  margin: 0 auto;
  transition: margin 0.24s;
  ${Bar}:hover & {
    margin-top: 1.2rem;
    margin-bottom: 0.44rem;
  }
`;

export const Cup = styled.section`
  grid-area: cup;
`;

export const Card = styled.section`
  grid-area: card;
  align-self: end;
  margin-bottom: 5.4rem;
`;

export const Img = styled.img`
  widht: 30rem;
  height: 30rem;
`;

export const H2 = styled.h2`
  position: relative;
  z-index: 1;
  width: 46rem;
  margin: 0;
  font-family: ${headerFont};
  font-size: ${fontXXXL};
  line-height: 1;
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

const CupItem = ({ post }) => (
  <Bar>
    <Wrapper>
      <Card>
        <Link route="post" params={{ slug: post.slug }}>
          <a>
            <H2>{post.name}</H2>
            <Address>{post.address}</Address>
          </a>
        </Link>
      </Card>
      <Cup>
        <Link route="post" params={{ slug: post.slug }}>
          <a>
            <Img
              src={`/static/cups/${post.slug}@S.png`}
              alt={`${post.name} coffee cup`}
            />
          </a>
        </Link>
      </Cup>
    </Wrapper>
  </Bar>
);

export default CupItem;
