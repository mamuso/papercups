import React from "react";
import { Link } from "../../routes";
import Wrapper from "./Wrapper";

const CuppaItem = ({ post }) => (
  <Wrapper>
    <Link route="post" params={{ slug: post.slug }}>
      <a>
        <h3>{post.name}</h3>
        <img src={`/static/cups/${post.slug}@S.png`} />
      </a>
    </Link>
  </Wrapper>
);

export default CuppaItem;
