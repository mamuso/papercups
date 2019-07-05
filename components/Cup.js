import React from "react";
import { Link } from "../routes";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Img = styled.img`
  widht: 300px;
  height: 300px;
`;

const CupItem = ({ post }) => (
  <Wrapper>
    <Link route="post" params={{ slug: post.slug }}>
      <a>
        <h2>{post.name}</h2>
        <Img src={`/static/cups/${post.slug}@S.png`} />
      </a>
    </Link>
  </Wrapper>
);

export default CupItem;
