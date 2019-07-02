import React from "react";
import { Link } from "../../routes";
import Wrapper from "./Wrapper";
import Router from "next/router";

const PostItem = ({ post }) => (
  <Wrapper>
    <Link route="post" params={{ slug: post.slug }}>
      <a>
        <h3>{post.name}</h3>
        <p>{post.body}</p>
      </a>
    </Link>
  </Wrapper>
);

export default PostItem;
