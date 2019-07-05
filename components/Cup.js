import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { transparentize } from "polished";
import { headerFont, monospace, fontS, fontXXXL } from "../utils/fonts";
import { textColor } from "../utils/colors";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas: "cup card";
  position: relative;
  width: 720px;
  margin: 4.2rem auto;
`;

export const Cup = styled.section`
  grid-area: cup;
`;

export const Card = styled.section`
  grid-area: card;
  align-self: end;
  margin-bottom: 5rem;
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
            alt="{post.name} coffee cup"
          />
        </a>
      </Link>
    </Cup>
  </Wrapper>
);

export default CupItem;
