import React from "react";
import { Link } from "../routes";
import styled from "styled-components";
import { headerFont, monospace, fontS, fontXXXL } from "../utils/fonts";

export const Wrapper = styled.div``;

export const Img = styled.img`
  widht: 300px;
  height: 300px;
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
  top: -1.4rem;
  width: 29rem;
  padding: 1.8rem 1.6rem;
  border-radius: 0.4rem;
  background: white;
  font-family: ${monospace};
  font-size: ${fontS};
  font-style: normal;
`;

const CupItem = ({ post }) => (
  <Wrapper>
    <Link route="post" params={{ slug: post.slug }}>
      <a>
        <H2>{post.name}</H2>
        <Address>{post.address}</Address>
        <Img src={`/static/cups/${post.slug}@S.png`} />
      </a>
    </Link>
  </Wrapper>
);

export default CupItem;
